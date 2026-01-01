import { useState } from 'react';
import { FiUser, FiEdit2, FiSave, FiX, FiMail, FiCamera } from 'react-icons/fi';
import EditableField from './EditableField';
import api from '@api/axios';

const COUNTRIES = [
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Other', value: 'Other' },
];

const CLOUDINARY_CLOUD_NAME = 'dvssqdhru';
const CLOUDINARY_UPLOAD_PRESET = 'profile_avatar';

const AccountDetailsCard = ({ user, onUserUpdate }) => {
  if (!user) return null;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    username: user.username || '',
    gender: user.gender || '',
    phone: user.phone || '',
    address: user.address || '',
    country: user.country || '',
  });

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setForm({
      username: user.username || '',
      gender: user.gender || '',
      phone: user.phone || '',
      address: user.address || '',
      country: user.country || '',
    });
    setEditing(false);
    setError('');
  };

  // -----------------------------
  // SAVE PROFILE DETAILS
  // -----------------------------
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const res = await api.put('/auth/update-profile', form);

      if (!res.data?.user) {
        throw new Error('Invalid response');
      }

      onUserUpdate(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // AVATAR UPLOAD (CLOUDINARY)
  // -----------------------------
  const handleAvatarUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        throw new Error('Cloudinary upload failed');
      }

      // Save avatar URL to backend
      const res = await api.put('/auth/update-profile', {
        avatar: cloudData.secure_url,
      });

      onUserUpdate(res.data.user);
    } catch (err) {
      console.error(err);
      setError('Avatar upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-full bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-medium flex items-center gap-2">
          <FiUser />
          Account Details
        </h2>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-sm text-text-muted hover:text-text-main"
          >
            <FiEdit2 />
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 text-sm text-green-500 disabled:opacity-50"
            >
              <FiSave />
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1 text-sm text-red-500 disabled:opacity-50"
            >
              <FiX />
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-status-danger">{error}</p>}

      {/* AVATAR */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={
              user.avatar || `https://ui-avatars.com/api/?name=${user.username}`
            }
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border border-bg-elevated"
          />

          {editing && (
            <label className="absolute bottom-0 right-0 bg-bg-elevated p-2 rounded-full cursor-pointer">
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
            </label>
          )}
        </div>

        <div>
          <p className="font-medium">Profile Photo</p>
          <p className="text-sm text-text-muted">JPG or PNG, max 2MB</p>
        </div>
      </div>

      {/* FIELDS */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Email (read-only) */}
        <div className="space-y-1">
          <p className="text-text-muted text-sm">Email</p>
          <p className="font-medium text-sm flex items-center gap-2 wrap-break-word">
            <FiMail className="text-text-muted" />
            {user.email}
          </p>
        </div>

        <EditableField
          label="Username"
          name="username"
          value={form.username}
          editing={editing}
          onChange={handleChange}
        />

        <EditableField
          label="Gender"
          name="gender"
          value={form.gender}
          editing={editing}
          onChange={handleChange}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
        />

        <EditableField
          label="Country"
          name="country"
          value={form.country}
          editing={editing}
          onChange={handleChange}
          options={COUNTRIES}
        />

        <EditableField
          label="Address"
          name="address"
          value={form.address}
          editing={editing}
          onChange={handleChange}
        />

        <EditableField
          label="Phone"
          name="phone"
          value={form.phone}
          editing={editing}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AccountDetailsCard;
