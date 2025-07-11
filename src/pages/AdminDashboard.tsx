import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import { 
  Users, 
  Calendar, 
  Upload, 
  QrCode, 
  BarChart3, 
  Mail, 
  FileText,
  GraduationCap 
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleEmailReports = async () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 3000)),
      {
        loading: 'Sending monthly reports...',
        success: 'Monthly reports sent to all students!',
        error: 'Failed to send reports.',
      }
    );
  };

  const dashboardItems = [
    {
      title: "Student Management",
      description: "Add, edit, and manage student accounts",
      icon: Users,
      link: "/manage-students",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700"
    },
    {
      title: "Batch Management",
      description: "Create and organize student batches",
      icon: GraduationCap,
      link: "/batches",
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "from-emerald-600 to-emerald-700"
    },
    {
      title: "Marks Upload",
      description: "Upload and manage student examination marks",
      icon: Upload,
      link: "/upload-marks",
      color: "from-yellow-500 to-orange-500",
      hoverColor: "from-yellow-600 to-orange-600"
    },
    {
      title: "QR Scanner",
      description: "Scan student QR codes for attendance",
      icon: QrCode,
      link: "/scanner",
      color: "from-pink-500 to-purple-500",
      hoverColor: "from-pink-600 to-purple-600"
    },
    {
      title: "Reports & Analytics",
      description: "Generate comprehensive reports",
      icon: BarChart3,
      link: "/monthly-reports",
      color: "from-cyan-500 to-blue-500",
      hoverColor: "from-cyan-600 to-blue-600"
    },
    {
      title: "Resume Review",
      description: "Review and approve student resumes",
      icon: FileText,
      link: "/resume-review",
      color: "from-indigo-500 to-purple-500",
      hoverColor: "from-indigo-600 to-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-orange-100 via-white to-orange-200 p-8 relative transition-colors duration-700">
      {/* VCube Logo at top left */}
      <img
        src="/vcubelogo.png"
        alt="VCube Logo"
        className="absolute top-8 left-8 h-20 w-auto rounded-2xl shadow-lg z-10 transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
      />
      {/* AWS Logo at top right */}
      <img
        src="/aws.png"
        alt="AWS Logo"
        className="absolute top-8 right-8 h-20 w-auto rounded-2xl shadow-lg z-10 transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12 text-center">
          <h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-black via-orange-500 to-orange-400 bg-clip-text text-transparent transition-all duration-500 hover:from-orange-500 hover:via-black hover:to-orange-400 hover:scale-105 cursor-pointer"
            style={{
              backgroundSize: '200% 200%',
              transition: 'background 0.5s, transform 0.5s',
            }}
          >
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage your institution with powerful tools</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link
                to={item.link}
                className="block h-full"
              >
                <div className={`
                  h-full p-8 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} 
                  hover:${item.hoverColor} transition-all duration-300 
                  transform group-hover:shadow-xl
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                  <p className="text-white text-opacity-90 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Monthly Reports</h2>
                <p className="text-gray-600">Send comprehensive reports to all students instantly</p>
                {/* Batch and Month Selection */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Batch
                    </option>
                    <option value="batch1">Batch 1</option>
                    <option value="batch2">Batch 2</option>
                    <option value="batch3">Batch 3</option>
                  </select>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Month
                    </option>
                    <option value="jan">January</option>
                    <option value="feb">February</option>
                    <option value="mar">March</option>
                    <option value="apr">April</option>
                    <option value="may">May</option>
                    <option value="jun">June</option>
                    <option value="jul">July</option>
                    <option value="aug">August</option>
                    <option value="sep">September</option>
                    <option value="oct">October</option>
                    <option value="nov">November</option>
                    <option value="dec">December</option>
                  </select>
                  {/* Preview Report Button */}
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
                    type="button"
                    onClick={() => setShowPreview(true)}
                  >
                    Preview Report
                  </button>
                </div>
              </div>
            </div>
           
          </div>
        </motion.div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Report Preview</h3>
              <div className="mb-6 text-gray-700">
                {/* Student details preview */}
                <p className="mb-2 font-semibold">The following student details will be sent:</p>
                <ul className="mb-4 list-disc list-inside text-base">
                  <li><span className="font-medium">Name:</span> John Doe</li>
                  <li><span className="font-medium">Email:</span> johndoe@email.com</li>
                  <li><span className="font-medium">Batch:</span> Batch 1</li>
                  <li><span className="font-medium">Month:</span> July</li>
                  <li><span className="font-medium">Class Attendance:</span> 92%</li>
                  <li><span className="font-medium">Class Conducted:</span> 24</li>
                  <li><span className="font-medium">Lab Attendance:</span> 90%</li>
                  <li><span className="font-medium">Lab Conducted:</span> 10</li>
                  <li><span className="font-medium">Total Exam Marks:</span> 85/100</li>
                  <li><span className="font-medium">Total Exam Conducted:</span> 2</li>
                  <li><span className="font-medium">Total Mock Marks:</span> 40/50</li>
                  <li><span className="font-medium">Total Mock Conducted:</span> 1</li>
                  <li><span className="font-medium">Total Projects Completed:</span> 3</li>
                  <li><span className="font-medium">Remarks:</span> Good progress</li>
                </ul>
                <p className="text-sm text-gray-500">*This is a sample preview. Actual data will be based on your selection.</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowPreview(false)}
                >
                  Close
                </button>
                <button
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
                  onClick={() => {
                    setShowPreview(false);
                    handleEmailReports();
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;