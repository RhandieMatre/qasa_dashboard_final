import React, { useState } from 'react';
import { Clock, Search, X } from 'lucide-react';

const PendingPosting = ({ pendingItems, searchTerm, setSearchTerm }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter items based on search term
  const filteredItems = pendingItems.filter(item =>
    item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center">
          <Clock size={18} className="mr-2 text-blue-500" />
          Pending for Posting
        </h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          />
          <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* List */}
      {filteredItems.length > 0 ? (
        <div className="overflow-hidden">
          {filteredItems.map(item => (
            <div key={item.id} className="border-b border-gray-100 py-3 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.reference}</p>
                  <p className="text-xs text-gray-500">{item.client} • {item.date}</p>
                </div>
                <div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No pending postings</p>
      )}

      {/* View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedItem(null)}
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{selectedItem.reference}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Client:</strong> {selectedItem.client}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Date:</strong> {selectedItem.date}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Status:</strong> Pending for Posting
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPosting;
