import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    title: 'Perfect Espresso',
    category: 'Coffee',
  },
  {
    url: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg',
    title: 'Cappuccino Art',
    category: 'Coffee',
  },
  {
    url: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg',
    title: 'Chocolate Cake',
    category: 'Desserts',
  },
  {
    url: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
    title: 'Fresh Coffee Beans',
    category: 'Ambience',
  },
  {
    url: 'https://images.pexels.com/photos/1329578/pexels-photo-1329578.jpeg',
    title: 'Mocha Delight',
    category: 'Coffee',
  },
  {
    url: 'https://images.pexels.com/photos/3970333/pexels-photo-3970333.jpeg',
    title: 'Cozy Interior',
    category: 'Ambience',
  },
  {
    url: 'https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg',
    title: 'Fresh Croissants',
    category: 'Food',
  },
  {
    url: 'https://images.pexels.com/photos/1892933/pexels-photo-1892933.jpeg',
    title: 'Barista at Work',
    category: 'Ambience',
  },
  {
    url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg',
    title: 'Cheesecake Special',
    category: 'Desserts',
  },
  {
    url: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
    title: 'Green Tea',
    category: 'Tea',
  },
  {
    url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    title: 'Coffee Time',
    category: 'Coffee',
  },
  {
    url: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    title: 'Coffee Preparation',
    category: 'Ambience',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Coffee', 'Tea', 'Desserts', 'Food', 'Ambience'];

  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0
      );
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-gray-200">
            A Visual Journey Through Our Café
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-amber-700 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-square"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-amber-400 transition-colors z-50"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-amber-400 transition-colors z-50"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].url}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">
                {filteredImages[selectedImage].title}
              </h3>
              <p className="text-gray-300">
                {filteredImages[selectedImage].category}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {selectedImage + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
