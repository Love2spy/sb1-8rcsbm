import React, { useState } from 'react';
import { Plus, Star, Mail, Phone, Loader } from 'lucide-react';
import { useSubcontractors } from '../hooks/useSubcontractors';
import { Subcontractor } from '../types';

const SubcontractorManager = () => {
  const { subcontractors, loading, error, addSubcontractor } = useSubcontractors();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSubcontractor, setNewSubcontractor] = useState<Partial<Subcontractor>>({
    name: '',
    type: '',
    email: '',
    phone: '',
    certifications: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSubcontractor(newSubcontractor as Omit<Subcontractor, 'id'>);
      setIsAddingNew(false);
      setNewSubcontractor({
        name: '',
        type: '',
        email: '',
        phone: '',
        certifications: [],
      });
    } catch (err) {
      console.error('Failed to add subcontractor:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Subcontractor Management</h2>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setIsAddingNew(true)}
        >
          <Plus className="h-5 w-5" />
          Add Subcontractor
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isAddingNew && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newSubcontractor.name}
                onChange={e => setNewSubcontractor(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newSubcontractor.type}
                onChange={e => setNewSubcontractor(prev => ({ ...prev, type: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newSubcontractor.email}
                onChange={e => setNewSubcontractor(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newSubcontractor.phone}
                onChange={e => setNewSubcontractor(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcontractors.map((subcontractor) => (
          <div key={subcontractor.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{subcontractor.name}</h3>
                  <p className="text-sm text-gray-500">{subcontractor.type}</p>
                </div>
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {subcontractor.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {subcontractor.phone}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex gap-2 flex-wrap">
                  {subcontractor.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Past Projects: {subcontractor.pastProjects}</span>
                <span className="text-gray-600">Rating: {subcontractor.rating}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcontractorManager;