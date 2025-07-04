import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Upload } from 'lucide-react';

const ManageStudentsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [students, setStudents] = useState<{ id: string; name: string; email: string; mobile: string; batch: string; active: boolean }[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [batch, setBatch] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editStudent, setEditStudent] = useState<{ id: string; name: string; email: string; mobile: string; batch: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filtered students based on search and batch
  const filteredStudents = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.email.toLowerCase().includes(search.toLowerCase()) ||
     s.mobile.includes(search)) &&
    (filterBatch === '' || s.batch === filterBatch)
  );

  // Handle single student add
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && name && email && mobile && batch) {
      setStudents([...students, { id: studentId, name, email, mobile, batch, active: true }]);
      setStudentId('');
      setName('');
      setEmail('');
      setMobile('');
      setBatch('');
      setShowAddModal(false);
    }
  };

  // Handle bulk upload (CSV/Excel)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      // CSV: id,name,email,mobile,batch per line
      const lines = text.split('\n').filter(Boolean);
      const newStudents = lines.map(line => {
        const [id, name, email, mobile, batch] = line.replace('\r', '').split(',');
        return {
          id: id?.trim() || '',
          name: name?.trim() || '',
          email: email?.trim() || '',
          mobile: mobile?.trim() || '',
          batch: batch?.trim() || '',
          active: true
        };
      }).filter(s => s.id && s.name && s.email && s.mobile && s.batch);
      setStudents(prev => [...prev, ...newStudents]);
      setShowUploadModal(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  // Export CSV
  const handleExportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Mobile', 'Batch', 'Active'],
      ...students.map(s => [s.name, s.email, s.mobile, s.batch, s.active ? 'Active' : 'Inactive'])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Edit handler
  const handleEditStudent = (idx: number) => {
    setEditIdx(idx);
    setEditStudent({ ...students[idx] });
  };

  // Save handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editStudent && editIdx !== null) {
      setStudents(students =>
        students.map((s, i) => i === editIdx ? { ...s, ...editStudent } : s)
      );
      setEditIdx(null);
      setEditStudent(null);
    }
  };

  // Placeholder handlers for assign batch, activate/deactivate
  const handleAssignBatch = (idx: number) => {
    alert('Batch assignment feature coming soon!');
  };
  const handleToggleActive = (idx: number) => {
    setStudents(students =>
      students.map((s, i) => i === idx ? { ...s, active: !s.active } : s)
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Management</h1>
          <p className="text-xl text-gray-600">Add, view, edit, and manage student accounts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add Single Student Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 transition-colors cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <UserPlus className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Single Student</h3>
              <p className="text-gray-600">Manually add individual student profiles with complete details</p>
            </motion.div>

            {/* Bulk Upload Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bulk Upload</h3>
              <p className="text-gray-600">Upload multiple students using Excel/CSV files</p>
            </motion.div>
          </div>

          {/* Add Student Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                <button
                  className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setShowAddModal(false)}
                >×</button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Student</h2>
                <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Student Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <select
                    value={batch}
                    onChange={e => setBatch(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">Select Batch</option>
                    <option value="Batch A">Batch A</option>
                    <option value="Batch B">Batch B</option>
                    <option value="Batch C">Batch C</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    Add Student
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Bulk Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                <button
                  className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => setShowUploadModal(false)}
                >×</button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Bulk Upload Students</h2>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  className="mb-4"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500 mb-2">
                  Upload a CSV file with columns: <b>id,name,email,mobile,batch</b>
                </p>
              </div>
            </div>
          )}

          {/* Student List */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Student List</h3>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search by name, email, or mobile"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  value={filterBatch}
                  onChange={e => setFilterBatch(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="">All Batches</option>
                  <option value="Batch A">Batch A</option>
                  <option value="Batch B">Batch B</option>
                  <option value="Batch C">Batch C</option>
                </select>
              </div>
            </div>

            {students.length === 0 ? (
              <p className="text-gray-500">No students added yet.</p>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={handleExportCSV}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
                  >
                    Export to CSV
                  </button>
                </div>
                <ul className="divide-y">
                  {filteredStudents.map((student, idx) => (
                    <li key={idx} className="py-2 flex flex-col md:flex-row md:justify-between">
                      <div>
                        <span className="font-semibold">{student.name}</span> ({student.id})
                        <div className="text-gray-500">
                          {student.email} | {student.mobile}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs rounded-full px-3 py-1 ${student.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {student.active ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => handleEditStudent(idx)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAssignBatch(idx)}
                          className="text-blue-500 hover:underline"
                        >
                          Assign Batch
                        </button>
                        <button
                          onClick={() => handleToggleActive(idx)}
                          className={`text-white rounded-full w-8 h-8 flex items-center justify-center ${student.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {student.active ? '✖' : '✔'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Edit Student Modal */}
          {editStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                <button
                  className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => { setEditIdx(null); setEditStudent(null); }}
                >×</button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Student</h2>
                <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={editStudent.id}
                    onChange={e => setEditStudent({ ...editStudent, id: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={editStudent.name}
                    onChange={e => setEditStudent({ ...editStudent, name: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Student Email"
                    value={editStudent.email}
                    onChange={e => setEditStudent({ ...editStudent, email: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={editStudent.mobile}
                    onChange={e => setEditStudent({ ...editStudent, mobile: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  <select
                    value={editStudent.batch}
                    onChange={e => setEditStudent({ ...editStudent, batch: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                    required
                  >
                    <option value="">Select Batch</option>
                    <option value="Batch A">Batch A</option>
                    <option value="Batch B">Batch B</option>
                    <option value="Batch C">Batch C</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Coming Soon</h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• Student search and filtering capabilities</li>
              <li>• Batch assignment and management</li>
              <li>• Student profile editing and updates</li>
              <li>• Export student data and reports</li>
              <li>• Student account activation/deactivation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageStudentsPage;