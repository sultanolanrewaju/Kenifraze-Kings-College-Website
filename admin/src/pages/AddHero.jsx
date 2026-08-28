import React, { useEffect, useRef, useState } from "react";
import "../styles/add-food.style.css";
import useContact from "../store/useContact";
import api from "../libs/api"


const AddHero = () => {
	const { submitHero, fetchHero, heroImages, isSubmit } = useContact();

	const [selectedImages, setSelectedImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [errors, setErrors] = useState({});
	const msgRef = useRef(null);

	useEffect(() => {
		// fetchHero();
	}, []);

	const validate = () => {
		const newErrors = {};
		const totalImages = selectedImages.length + (heroImages?.length || 0);
		if (totalImages === 0) {
			newErrors.images = "At least one image is required";
		}
		if (totalImages > 6) {
			newErrors.images = "Maximum 6 images allowed";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const showMsg = (msg, success) => {
		if (!msgRef.current) return;
		msgRef.current.className = success
			? "success-message"
			: "error-message";
		msgRef.current.textContent = msg;
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		setTimeout(() => {
			if (msgRef.current) {
				msgRef.current.className = "";
				msgRef.current.textContent = "";
			}
		}, 3000);
	};

	const handleImageChange = e => {
		const files = Array.from(e.target.files);
		const total =
			files.length + selectedImages.length + (heroImages?.length || 0);
		if (total > 6) {
			showMsg("Maximum 6 images allowed", false);
			return;
		}
		setSelectedImages(prev => [...prev, ...files]);
		const previews = files.map(file => URL.createObjectURL(file));
		setPreviewImages(prev => [...prev, ...previews]);
		if (errors.images) {
			setErrors(prev => ({
				...prev,
				images: ""
			}));
		}
	};

	const removeNewImage = index => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
		setPreviewImages(prev => prev.filter((_, i) => i !== index));
	};
	const removeExistingImage = index => {
		// remove from existing images
		// backend should update on submit
		const updated = [...heroImages];
		updated.splice(index, 1);

		if (typeof fetchHero === "function") {
			useContact.setState({
				heroImages: updated
			});
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!validate()) {
			return;
		}
		const formData = new FormData();
		selectedImages.forEach(image => {
			formData.append("images", image);
		});
		formData.append("existingImages", JSON.stringify(heroImages || []));
		submitHero(formData, showMsg);
	};

	const resetForm = () => {
		setSelectedImages([]);
		setPreviewImages([]);
		setErrors({});
	};

	return (
		<div className="main-content">
			<div id="addm--food" className="container">
				<div className="form-container">
					<div className="form-header">
						<h2>Edit Hero Images</h2>
						<p ref={msgRef}></p>
					</div>

					<div className="form-body">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>
									Select Hero Images
									<span style={{ color: "#ef4444" }}>*</span>
								</label>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleImageChange}
								/>
								<small>Maximum 6 images allowed</small>
								{errors.images && (
									<p
										style={{
											color: "#ef4444",
											marginTop: "5px"
										}}
									>
										{errors.images}
									</p>
								)}
							</div>
							<div className="image-grid">
								{heroImages?.length>0 && heroImages?.map((image, index) => (
									<div
										key={`old-${index}`}
										className="image-item"
									>
										<img src={api+image} alt="" />
										<button
											type="button"
											className="remove-btn"
											onClick={() =>
												removeExistingImage(index)
											}
										>
											✕
										</button>
									</div>
								))}
								{previewImages?.length>0 &&  previewImages?.map((image, index) => (
									<div
										key={`new-${index}`}
										className="image-item"
									>
										<img src={image} alt="" />
										<button
											type="button"
											className="remove-btn"
											onClick={() =>
												removeNewImage(index)
											}
										>
											✕
										</button>
									</div>
								))}
							</div>

							<div className="actions">
								<button
									type="button"
									className="btn btn-reset"
									onClick={resetForm}
								>
									Reset
								</button>

								<button
									type="submit"
									className="btn btn-submit"
									disabled={isSubmit}
								>
									{isSubmit ? (
										<>
											<div className="spinner"></div>
											Processing...
										</>
									) : (
										"Save Changes"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddHero;
