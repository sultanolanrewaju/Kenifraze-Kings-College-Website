import React, { useState, useEffect, useRef } from "react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
const slidesData = [
	{
		src: "/IMAGES/group_photo.jpg",
		alt: "students",
		title: "Welcome to KKC",
		description: "Inspiring excellence and leadership for a brighter future."
		,btnText : "Explore Our Campus",
		btnLink : "http://www.youtube.com"
	    
	},
	{
		src: "/IMAGES/graduands.jpg",
		alt: "Makeup artist",
		title: "Academic Excellence",
		description: "Providing quality education in a modern learning environment.",
		btnText : "Learn More",
		btnLink : ""
	},
	{
		src: "/IMAGES/COVER3.jpeg",
		alt: "Students.",
		title: "Unlocking Hidden Potentials",
		description: "Uncovering hidden potential and revealing students creativity."
		,btnText : "Build Profile",
		btnLink : ""},
	{
	 	src: "/IMAGES/COVER4.jpeg",
	 	alt: "Students",
	 	title: "Building Future Leaders",
	 	description: "Empowering students with knowledge, values, and confidence."
	,	btnText : "Join Us Today",
	 	btnLink : ""
	    
	}
];

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);
	const intervalRef = useRef(null);

	const totalSlides = slidesData.length;

	// Go to specific slide
	const goToSlide = (index) => {
		setCurrentIndex((prev) => (index + totalSlides) % totalSlides);
	};

	// Next & Previous
	const nextSlide = () => goToSlide(currentIndex + 1);
	const prevSlide = () => goToSlide(currentIndex - 1);

	// Auto slide
	useEffect(() => {
		if (isPaused) {
			clearInterval(intervalRef.current);
			return;
		}

		intervalRef.current = setInterval(nextSlide, 5000);

		return () => clearInterval(intervalRef.current);
	}, [currentIndex, isPaused]);

	// Touch swipe support
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const diff = touchStartX.current - touchEndX.current;

		if (Math.abs(diff) > 60) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	};

	return (
		<div
			id='home'
			className='carousel-wrapper'
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}>
			<div className='carousel'>
				<div
					className='slides'
					style={{
						transform: `translateX(-${currentIndex * 100}%)`
					}}>
					{slidesData.map((slide, index) => (
						<div
							key={index}
							className={`slide ${index === currentIndex ? "active" : ""}`}>
							<img src={slide.src} alt={slide.alt} />
							<div className='slide-content'>
								<h2>{slide.title}</h2>
								<p>{slide.description}</p>
                                     <button>{slide.btnText}</button>
							</div>
						</div>
					))}
				</div>

				<button className='carousel-btn prev' onClick={prevSlide}>
					<AiOutlineArrowLeft/>
				</button>
				<button className='carousel-btn next' onClick={nextSlide}>
					<AiOutlineArrowRight/>
				</button>

				<div className='dots'>
					{slidesData.map((_, index) => (
						<div
							key={index}
							className={`dot ${index === currentIndex ? "active" : ""}`}
							onClick={() => goToSlide(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;

