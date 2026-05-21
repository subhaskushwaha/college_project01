import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AgentHeader from "./Agent/AgentHeader";
import AgentDashboardOverview from "./Agent/AgentDashboardOverview";
import AgentLeadList from "./Agent/AgentLeadList";
import AgentLeadDetail from "./Agent/AgentLeadDetail";

const AgentDashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadFilter, setLeadFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  // API Leads
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [callLogs, setCallLogs] = useState([
    {
      date: "October 15, 2023",
      duration: "12 minutes",
      notes:
        "Customer expressed interest in our premium package.",
    },
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    if (!user.id || user.role !== "agent") {
      navigate("/login");
      return;
    }

    setCurrentUser(user);

    fetchLeads();
  }, [navigate]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!user.id || user.role !== "agent") {
    navigate("/login");
    return;
  }

  setCurrentUser(user);

  fetchLeads();
  fetchDashboardStats();

}, [navigate]);

  // ================= FETCH LEADS API =================

  const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/analytics/dashboard-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Dashboard API:", response.data);

    setDashboardStats(response.data.data);

  } catch (error) {
    console.error("Dashboard API Error:", error);
  }
};

const fetchLeads = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/getLeads`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response:", response.data);

    const leadsData =
      response.data?.data || response.data || [];

    setLeads(leadsData);
  } catch (error) {
    console.error("Error fetching leads:", error);
  } finally {
    setLoading(false);
  }
};

  // ================= OPEN MODAL =================

const openLeadDetail = (leadId) => {
  const lead = leads.find((l) => l._id === leadId);

  setSelectedLead(lead);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const saveLeadChanges = () => {
    alert("Lead details updated successfully!");
    closeModal();
  };

  // ================= ADD CALL LOG =================

  const addCallLog = () => {
    const duration =
      document.getElementById("call-duration")?.value || "10";

    const notes =
      document.getElementById("call-notes")?.value || "";

    if (!notes) {
      alert("Please enter call notes");
      return;
    }

    const newCallLog = {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      duration: `${duration} minutes`,
      notes: notes,
    };

    setCallLogs((prev) => [newCallLog, ...prev]);

    if (document.getElementById("call-notes")) {
      document.getElementById("call-notes").value = "";
    }
  };

  // ================= FILTER =================

const filteredLeads = leads.filter((lead) => {
  const matchesFilter =
    leadFilter === "all" || lead.status === leadFilter;

  const matchesSearch =
    lead.customer_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    lead.campaign_type
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchesFilter && matchesSearch;
});
  // ================= STATUS BADGE =================

  const getStatusBadge = (status) => {
    const config = {
      new: {
        class: "bg-red-100 text-red-800",
        text: "New",
      },
      contacted: {
        class: "bg-yellow-100 text-yellow-800",
        text: "Contacted",
      },
      qualified: {
        class: "bg-green-100 text-green-800",
        text: "Qualified",
      },
      converted: {
        class: "bg-blue-100 text-blue-800",
        text: "Converted",
      },
    }[status] || {
      class: "bg-gray-100 text-gray-800",
      text: status || "Unknown",
    };

    return (
      <span
        className={`inline-flex flex-shrink-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}
      >
        {config.text}
      </span>
    );
  };

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AgentHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
      />

      <main className="container mx-auto px-4 py-8 flex-1 w-full max-w-7xl">
        {currentPage === "dashboard" && (
         <AgentDashboardOverview
  openLeadDetail={openLeadDetail}
  dashboardStats={dashboardStats}
   leads={leads}
   setCurrentPage={setCurrentPage}
/>

        )}

        {currentPage === "leads" && (
          <AgentLeadList
            leadFilter={leadFilter}
            setLeadFilter={setLeadFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredLeads={filteredLeads}
            getStatusBadge={getStatusBadge}
            openLeadDetail={openLeadDetail}
            loading={loading}
          />
        )}
      </main>

      {isModalOpen && (
        <AgentLeadDetail
          selectedLead={selectedLead}
          closeModal={closeModal}
          saveLeadChanges={saveLeadChanges}
          callLogs={callLogs}
          addCallLog={addCallLog}
        />
      )}
    </div>
  );
};

export default AgentDashboard;