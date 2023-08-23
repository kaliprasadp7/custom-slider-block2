import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const Slide = ({ slide, onUpdateSlide, onRemoveSlide }) => {
	return (
	  <div className="slide">
		<MediaUploadCheck>
		  <MediaUpload
			onSelect={(media) => onUpdateSlide({ ...slide, image: media.url })}
			render={({ open }) => (
			  <Button onClick={open}>
				{slide.image ? <img src={slide.image} alt="Slide" /> : 'Upload Image'}
			  </Button>
			)}
		  />
		</MediaUploadCheck>
		<RichText
		  tagName="h3"
		  placeholder="Slide Title"
		  value={slide.title}
		  onChange={(title) => onUpdateSlide({ ...slide, title })}
		/>
		<RichText
		  tagName="p"
		  placeholder="Slide Description"
		  value={slide.description}
		  onChange={(description) => onUpdateSlide({ ...slide, description })}
		/>
		<Button onClick={() => onRemoveSlide(slide)}>Remove Slide</Button>
	  </div>
	);
  };

const Edit = ({ attributes, setAttributes }) => {
	const { slides } = attributes;
  
	const addSlide = () => {
	  const newSlides = [...slides, { title: '', description: '', image: '' }];
	  setAttributes({ slides: newSlides });
	};
  
	const updateSlide = (index, updatedSlide) => {
	  const newSlides = [...slides];
	  newSlides[index] = updatedSlide;
	  setAttributes({ slides: newSlides });
	};
  
	const removeSlide = (indexToRemove) => {
	  const newSlides = slides.filter((_, index) => index !== indexToRemove);
	  setAttributes({ slides: newSlides });
	};
  
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
			<Slide
			  key={index}
			  slide={slide}
			  onUpdateSlide={(updatedSlide) => updateSlide(index, updatedSlide)}
			  onRemoveSlide={() => removeSlide(index)}
			/>
		  ))}
		</Slider>
		<Button isPrimary onClick={addSlide}>Add Slide</Button>
	  </div>
	);
  };
  
  export default Edit;
  
