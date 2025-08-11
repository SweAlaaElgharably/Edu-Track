import React, { useState } from 'react';
import '../styles/hall.css';

// Mock data for style and layout testing
const mockHalls = [
	{ id: 1, name: 'قاعة 101', faculty: { name: 'كلية الهندسة', slug: 'eng' }, capacity: 120 },
	{ id: 2, name: 'قاعة 202', faculty: { name: 'كلية العلوم', slug: 'sci' }, capacity: 80 },
	{ id: 3, name: 'قاعة 303', faculty: { name: 'كلية التجارة', slug: 'bus' }, capacity: 60 },
];

// Mock faculties for select list
const mockFaculties = [
	{ id: 1, name: 'كلية الهندسة', slug: 'eng' },
	{ id: 2, name: 'كلية العلوم', slug: 'sci' },
	{ id: 3, name: 'كلية التجارة', slug: 'bus' },
];

export default function Hall() {
	const [halls, setHalls] = useState(mockHalls);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState('create');
	const [form, setForm] = useState({ name: '', faculty: '', slug: '', capacity: '' });
	const [selectedHall, setSelectedHall] = useState(null);
	const [faculties] = useState(mockFaculties);

	// Handlers for CRUD (mock only)
	const handleDelete = (id) => {
		setHalls(halls.filter(h => h.id !== id));
	};
	const handleUpdate = (hall) => {
		setModalType('update');
		setSelectedHall(hall);
		setForm({
			name: hall.name,
			faculty: faculties.find(f => f.name === hall.faculty.name)?.id || '',
			slug: hall.faculty.slug,
			capacity: hall.capacity,
		});
		setShowModal(true);
	};
	const handleCreate = () => {
		setModalType('create');
		setSelectedHall(null);
		setForm({ name: '', faculty: '', slug: '', capacity: '' });
		setShowModal(true);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const selectedFaculty = faculties.find(f => f.id === Number(form.faculty));
		if (modalType === 'create') {
			setHalls([...halls, {
				id: halls.length + 1,
				name: form.name,
				faculty: { name: selectedFaculty?.name || '', slug: form.slug },
				capacity: form.capacity,
			}]);
		} else if (modalType === 'update' && selectedHall) {
			setHalls(halls.map(h => h.id === selectedHall.id ? {
				...h,
				name: form.name,
				faculty: { name: selectedFaculty?.name || '', slug: form.slug },
				capacity: form.capacity,
			} : h));
		}
		setShowModal(false);
	};

	return (
		<div className="hall-page">
			<h2 className="hall-header">القاعات</h2>
			<div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
				<div
					className="add-hall-btn"
					onClick={handleCreate}
					style={{
						minWidth: '140px',
						minHeight: '80px',
						padding: '1rem 0.7rem',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '0.5rem',
						boxSizing: 'border-box',
						display: 'flex',
						cursor: 'pointer',
					}}
				>
					<span style={{ fontSize: '1.5rem', marginBottom: 0, marginLeft: '0.5rem' }}>+</span>
					<span style={{ fontWeight: 'bold', fontSize: '1rem' }}>اضافه قاعة</span>
				</div>
			</div>
			<div className="hall-table-wrapper">
				<table className="hall-table">
					<thead>
						<tr>
							<th>اسم القاعة</th>
							<th>اسم الكلية</th>
							<th>slug</th>
							<th>مساحه القاعة</th>
							<th>تعديل القاعة</th>
							<th>مسح القاعة</th>
						</tr>
					</thead>
					<tbody>
						{halls.map(hall => (
							<tr key={hall.id} className="hall-row">
								<td>{hall.name}</td>
								<td>{hall.faculty.name}</td>
								<td>{hall.faculty.slug}</td>
								<td>{hall.capacity}</td>
								<td>
									<button className="btn update" onClick={() => handleUpdate(hall)}>تعديل القاعة</button>
								</td>
								<td>
									<button className="btn delete" onClick={() => handleDelete(hall.id)}>مسح القاعة</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal for Create/Update */}
			{showModal && (
				<div className="hall-modal-bg">
					<form className="hall-modal" onSubmit={handleSubmit}>
						<button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
						<h3>{modalType === 'create' ? 'اضافة قاعة جديدة' : 'تعديل القاعة'}</h3>
						<label>
							اسم القاعة:
							<input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
						</label>
						<label>
							اسم الكلية:
							<select value={form.faculty} onChange={e => setForm({ ...form, faculty: e.target.value })} required>
								<option value="">اختر الكلية</option>
								{faculties.map(fac => (
									<option key={fac.id} value={fac.id}>{fac.name}</option>
								))}
							</select>
						</label>
						<label>
							slug:
							<input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
						</label>
						<label>
							مساحه القاعة:
							<input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} required />
						</label>
						<button type="submit" className="btn update">{modalType === 'create' ? 'اضافة القاعة' : 'تحديث القاعة'}</button>
					</form>
				</div>
			)}
		</div>
	);
}
