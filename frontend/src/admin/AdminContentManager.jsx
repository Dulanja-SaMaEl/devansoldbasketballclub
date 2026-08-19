import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, X, Search, Image as ImageIcon } from 'lucide-react';
import { slugify } from '../utils/seoUtils';

export default function AdminContentManager() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const validTypes = ['timeline', 'achievements', 'legends', 'generations', 'gallery', 'stories', 'news', 'events'];
  const currentType = validTypes.includes(type) ? type : 'achievements';

  const loadData = () => {
    setLoading(true);
    api.getList(currentType)
      .then(res => {
        if (res.data) setItems(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [currentType]);

  const [deletingId, setDeletingId] = useState(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(getInitialFormData(currentType));
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const confirmDelete = (id) => {
    setDeletingId(id);
  };

  const executeDelete = async () => {
    if (deletingId) {
      await api.deleteItem(currentType, deletingId);
      setDeletingId(null);
      loadData();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.slug && (payload.title || payload.name)) {
      payload.slug = slugify(payload.title || payload.name);
    }
    if (editingItem) {
      await api.updateItem(currentType, editingItem.id, payload);
    } else {
      await api.createItem(currentType, payload);
    }
    setModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-800 pb-6 gap-4">
        <div>
          <span className="archive-stamp text-[10px] text-devan-gold uppercase">CONTENT MANAGER</span>
          <h1 className="font-display text-3xl font-extrabold text-devan-paper capitalize">
            Manage {currentType.replace('_', ' ')}
          </h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark flex items-center space-x-2 shadow-gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Items Table / List View */}
      {loading ? (
        <div className="text-center py-12 text-stone-400 font-serif">Loading entries...</div>
      ) : (
        <div className="bg-devan-dark-card border border-stone-800 rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-900 border-b border-stone-800 font-display uppercase tracking-wider text-devan-gold">
              <tr>
                <th className="p-4">Title / Name</th>
                <th className="p-4">Category / Role</th>
                <th className="p-4">Year / Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-serif">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-900/50">
                  <td className="p-4 font-bold text-devan-paper">
                    {item.title || item.name}
                  </td>
                  <td className="p-4 text-stone-400">
                    {item.category || item.role || item.tournament || item.status || 'General'}
                  </td>
                  <td className="p-4 text-devan-gold font-mono">
                    {item.year || item.start_year || item.date || item.published_date || 'N/A'}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 bg-stone-800 text-devan-gold rounded hover:bg-stone-700"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="p-1.5 bg-stone-800 text-red-400 rounded hover:bg-stone-700"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-w-md w-full bg-devan-dark-card border border-red-800/60 rounded-lg p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-red-400">Confirm Deletion</h3>
            <p className="font-serif text-sm text-stone-300">
              Are you sure you want to delete this record from the database? This action cannot be undone.
            </p>
            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs uppercase text-stone-400 hover:text-stone-200"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2 bg-red-900 border border-red-700 text-red-200 font-bold text-xs uppercase tracking-wider rounded hover:bg-red-800"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-w-2xl w-full bg-devan-dark-card border border-devan-gold/40 rounded-lg p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <h3 className="font-display font-bold text-lg text-devan-paper">
                {editingItem ? 'Edit Record' : 'Create New Record'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <FormFields type={currentType} formData={formData} setFormData={setFormData} />

              <div className="pt-4 border-t border-stone-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-devan-maroon border border-devan-gold text-devan-gold font-bold text-xs uppercase tracking-wider rounded hover:bg-devan-maroon-dark"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getInitialFormData(type) {
  switch (type) {
    case 'achievements':
      return { title: '', year: 2024, tournament: 'Island Wide Championship', category: 'Island Wide', position: 'Champions', description: '', captain: '', coach: '', image_url: '' };
    case 'legends':
      return { name: '', nickname: '', role: 'Captain & Guard', years_active: '1990 - 1995', bio: '', quote: '', profile_image_url: '' };
    case 'timeline':
      return { year: 2000, title: '', description: '', category: 'Milestone', key_figures: '' };
    case 'generations':
      return { name: '2020s Era', start_year: 2020, end_year: 2029, description: '', team_photo_url: '' };
    case 'gallery':
      return { title: '', caption: '', image_url: '', year: 2024, category: 'Matches' };
    case 'stories':
      return { title: '', author: '', generation_name: '1990s', story: '', date: new Date().toISOString().split('T')[0], status: 'Approved' };
    case 'news':
      return { title: '', slug: `news-${Date.now()}`, excerpt: '', content: '', cover_image_url: '', published_date: new Date().toISOString().split('T')[0], status: 'Published' };
    case 'events':
      return { title: '', description: '', date: '2026-12-01', time: '03:00 PM', location: 'Maliyadeva Court', status: 'Upcoming' };
    default:
      return {};
  }
}

function FormFields({ type, formData, setFormData }) {
  const handleChange = (field, val) => setFormData({ ...formData, [field]: val });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Title / Name *</label>
        <input
          type="text"
          required
          value={formData.title || formData.name || ''}
          onChange={(e) => handleChange(type === 'legends' ? 'name' : 'title', e.target.value)}
          className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
        />
      </div>

      {(type === 'achievements' || type === 'timeline' || type === 'gallery') && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Year</label>
            <input
              type="number"
              value={formData.year || 2024}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Category</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
            />
          </div>
        </div>
      )}

      {type === 'legends' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Role / Position</label>
            <input
              type="text"
              value={formData.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Years Active</label>
            <input
              type="text"
              value={formData.years_active || ''}
              onChange={(e) => handleChange('years_active', e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Image URL</label>
        <input
          type="url"
          value={formData.image_url || formData.profile_image_url || formData.team_photo_url || formData.cover_image_url || ''}
          onChange={(e) => {
            const key = type === 'legends' ? 'profile_image_url' : type === 'generations' ? 'team_photo_url' : type === 'news' ? 'cover_image_url' : 'image_url';
            handleChange(key, e.target.value);
          }}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs uppercase font-medium text-stone-300 mb-1">Description / Bio / Content</label>
        <textarea
          rows="4"
          value={formData.description || formData.bio || formData.story || formData.content || ''}
          onChange={(e) => {
            const key = type === 'legends' ? 'bio' : type === 'stories' ? 'story' : type === 'news' ? 'content' : 'description';
            handleChange(key, e.target.value);
          }}
          className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-sm text-stone-200 focus:border-devan-gold focus:outline-none font-serif"
        ></textarea>
      </div>
    </div>
  );
}
