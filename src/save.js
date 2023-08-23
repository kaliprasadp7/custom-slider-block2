import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
const Save = ({ attributes }) => {
	const { slides } = attributes;
  
	const slickSettings = {
	  dots: true,
	  infinite: true,
	  speed: 500,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	};
  
	return (
	  <div>
		<Slider {...slickSettings}>
		  {slides.map((slide, index) => (
			<div className="slide" key={index}>
			  {slide.image && <img src={slide.image} alt="Slide" />}
			  {slide.title && <h3>{slide.title}</h3>}
			  {slide.description && <p>{slide.description}</p>}
			</div>
		  ))}
		</Slider>
	  </div>
	);
  };
  
  export default Save;  
