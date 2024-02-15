import { useEffect, useState } from "react";
import { db } from "../firebase";
import { query, collection, getDocs } from "firebase/firestore";
function Dashboard() {
  const [counts, setCounts] = useState<DashbboardFetch>({
    totalUsers: 0,
    jobs: 0,
    completedJobs: 0,
    cancelledJobs: 0,
    pendingJobs: 0,
    contacts: 0,
    quotations: 0,
  });
  const fetchData = async () => {
    try {
      const usersQuery = query(collection(db, "users"));
      const jobsQuery = query(collection(db, "jobs"));
      const contactsQuery = query(collection(db, "contacts"));
      const quotationsQuery = query(collection(db, "quotations"));

      const [usersSnapshot, jobsSnapshot, contactSnapshop, quotationSnapshot] =
        await Promise.all([
          getDocs(usersQuery),
          getDocs(jobsQuery),
          getDocs(contactsQuery),
          getDocs(quotationsQuery),
        ]);

      const totalUsers = usersSnapshot.size;
      const jobs = jobsSnapshot.size;
      const totalQuotations = quotationSnapshot.size;
      const completedJobs = jobsSnapshot.docs.filter(
        (doc) => doc.data().status === "completed"
      ).length;
      const cancelledJobs = jobsSnapshot.docs.filter(
        (doc) => doc.data().status === "cancelled"
      ).length;
      const pendingJobs = jobsSnapshot.docs.filter(
        (doc) => doc.data().status === "pending"
      ).length;
      const contacts = contactSnapshop.size;
      setCounts({
        totalUsers,
        jobs,
        completedJobs,
        pendingJobs,
        contacts,
        cancelledJobs,
        quotations: totalQuotations,
      });
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };
  const cardsData = [
    { title: "Jobs", count: 10, color: "bg-blue-500", name: "jobs" },
    {
      title: "Completed Jobs",
      count: 5,
      color: "bg-green-500",
      name: "completedJobs",
    },
    {
      title: "Pending Jobs",
      count: 5,
      color: "bg-yellow-500",
      name: "pendingJobs",
    },
    {
      title: "Cancelled Jobs",
      count: 5,
      color: "bg-orange-500",
      name: "cancelledJobs",
    },
    {
      title: "Total Users",
      count: 5,
      color: "bg-lime-500",
      name: "totalUsers",
    },
    { title: "Contacts", count: 20, color: "bg-indigo-500", name: "contacts" },
    {
      title: "Total Quotations",
      count: 20,
      color: "bg-indigo-500",
      name: "quotations",
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  console.log(counts, "Coiunts");
  return (
    <section className="w-full flex flex-col items-center space-y-10 ">
      <div className="container mx-auto mt-8 px-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`p-6 h-44 rounded-md shadow-md ${card.color} text-white`}
            >
              <h2 className="text-xl font-bold mb-2">{card.title}</h2>
              <p className="text-3xl font-semibold">
                {counts[card.name as keyof DashbboardFetch]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
