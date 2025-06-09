import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Box, Clipboard } from 'lucide-react';

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  totalValue: number;
};

type CategoryData = {
  name: string;
  value: number;
  color: string;
};

const inventoryData: InventoryItem[] = [
  { id: 1, name: 'Office Supplies', category: 'Supplies', quantity: 15, unitPrice: 25.99, reorderLevel: 20, totalValue: 389.85 },
  { id: 2, name: 'Computer Monitors', category: 'Electronics', quantity: 8, unitPrice: 249.99, reorderLevel: 10, totalValue: 1999.92 },
  { id: 3, name: 'Desk Chairs', category: 'Furniture', quantity: 5, unitPrice: 179.99, reorderLevel: 8, totalValue: 899.95 },
  { id: 4, name: 'Accounting Software Licenses', category: 'Software', quantity: 3, unitPrice: 499.99, reorderLevel: 5, totalValue: 1499.97 },
  { id: 5, name: 'Paper Reams', category: 'Supplies', quantity: 12, unitPrice: 5.99, reorderLevel: 15, totalValue: 71.88 },
  { id: 6, name: 'Laptops', category: 'Electronics', quantity: 4, unitPrice: 1299.99, reorderLevel: 5, totalValue: 5199.96 },
  { id: 7, name: 'Filing Cabinets', category: 'Furniture', quantity: 7, unitPrice: 129.99, reorderLevel: 10, totalValue: 909.93 },
  { id: 8, name: 'Printer Ink', category: 'Supplies', quantity: 6, unitPrice: 24.99, reorderLevel: 10, totalValue: 149.94 },
];

const LowStockAlerts: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const lowStockItems = items.filter(item => item.quantity < item.reorderLevel);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <AlertTriangle size={20} className="mr-2 text-amber-500" />
          Low-stock Alerts
        </h2>
        <span className="bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-full">
          {lowStockItems.length} Items
        </span>
      </div>
      
      {lowStockItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-right">Quantity</th>
                <th className="p-2 text-right">Reorder Level</th>
                <th className="p-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-2 font-medium">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className="p-2 text-right">{item.reorderLevel}</td>
                  <td className="p-2 text-right">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                      Reorder Now
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No items currently below reorder level.</p>
      )}
    </div>
  );
};

const InventoryValue: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Box size={20} className="mr-2 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Inventory Value</h2>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center">
          <Clipboard size={16} className="mr-2" />
          Generate Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-blue-800">₱{totalValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Unique Products</p>
          <p className="text-2xl font-bold text-gray-800">{items.length}</p>
        </div>
      </div>
    </div>
  );
};

const CategoryDistribution: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const categoryData: CategoryData[] = [];
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const COLORS = ['#0078D7', '#1C61A1', '#20476E', '#5599D3', '#85B4DE'];
  
  categories.forEach((category, index) => {
    const categoryItems = items.filter(item => item.category === category);
    const categoryValue = categoryItems.reduce((sum, item) => sum + item.totalValue, 0);
    
    categoryData.push({
      name: category,
      value: categoryValue,
      color: COLORS[index % COLORS.length]
    });
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Stock Category Distribution</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Value']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {categoryData.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: category.color }}></div>
            <span className="text-sm text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

//Main here
const InventoryDashboard: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  
  useEffect(() => {
    // API logic here
    setTimeout(() => {
      setItems(inventoryData);
    }, 300);
  }, []);
  
  return (
    <div className="w-full h-full bg-[#F0F0F0] p-6 overflow-auto font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#20476E]">Inventory</h1>
        <p className="text-sm text-gray-600">Track and manage your inventory</p>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <InventoryValue items={items} />
          <LowStockAlerts items={items} />
        </div>
        
        <div className="mb-6">
          <CategoryDistribution items={items} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-bold flex items-center justify-center">
            View Inventory Tracking
          </button>
        </div>
      </main>
    </div>
  );
};

export default InventoryDashboard;