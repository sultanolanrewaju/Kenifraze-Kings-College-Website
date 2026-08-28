import React, { useRef, useState, useEffect } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";

const AddContact = () => {
    // 1. Destructure everything needed from your Zustand store
    const { 
        contacts, 
        fetchContact, 
        updateContact, 
        loading, 
        error, 
        successMessage 
    } = useContact();

    const [formData, setFormData] = useState({
        address: "",
        phone: "",
        email: "",
        school: "",
        social: ""
    });

    const [errors, setErrors] = useState({});
    const msgRef = useRef(null);

    // Get the single contact item from Zustand store
    const singleContact = contacts[0];

    // 2. Fetch contact info from database when component mounts
    useEffect(() => {
        fetchContact();
    }, []);

    // 3. Populate form fields once database contact data arrives
    useEffect(() => {
        if (singleContact) {
            setFormData({
                address: singleContact.address || "",
                phone: singleContact.phone || "",
                email: singleContact.email || "",
                school: singleContact.school || "",
                social: singleContact.social || ""
            });
        }
    }, [singleContact]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        // Address
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        } else if (formData.address.trim().length < 10) {
            newErrors.address = "Address must contain at least 10 characters";
        } else if (formData.address.trim().length > 500) {
            newErrors.address = "Address cannot exceed 500 characters";
        }

        // Phone
        if (!formData.phone.trim()) {
            newErrors.phone = "Contact number is required";
        } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
            newErrors.phone = "Enter a valid contact number";
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Enter a valid email address";
        }

        // School Hours
        if (!formData.school.trim()) {
            newErrors.school = "School Hours is required";
        }

        // Social / Map URL
        if (!formData.social.trim()) {
            newErrors.social = "Map URL is required";
        } else {
            try {
                new URL(formData.social.trim());
            } catch {
                newErrors.social = "Enter a valid URL";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Pass the contact ID along with the form data to update
        if (singleContact?._id) {
            await updateContact(singleContact._id, formData);
        } else {
            console.error("No contact ID found to update!");
        }
    };

    return (
        <div className="main-content">
            <div id="addm--food" className="container">
                <div className="form-container">
                    <div className="form-header">
                        <h2>Edit Contact Section</h2>
                        {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}
                        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
                    </div>

                    <div className="form-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Washington DC, New York City"
                                />
                                {errors.address && (
                                    <small className="field-error">{errors.address}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+88013******"
                                />
                                {errors.phone && (
                                    <small className="field-error">{errors.phone}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                />
                                {errors.email && (
                                    <small className="field-error">{errors.email}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label>School Hours</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    placeholder="8Am-4Pm"
                                />
                                {errors.school && (
                                    <small className="field-error">{errors.school}</small>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Social Url</label>
                                <input
                                    type="text"
                                    name="social"
                                    value={formData.social}
                                    onChange={handleChange}
                                    placeholder="https://maps.google.com/..."
                                />
                                {errors.social && (
                                    <small className="field-error">{errors.social}</small>
                                )}
                            </div>

                            <div className="actions">
                                <button
                                    type="submit"
                                    className="btn btn-submit"
                                    disabled={loading}
                                >
                                    {loading ? "Saving Changes..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;