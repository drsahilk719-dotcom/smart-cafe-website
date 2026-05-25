import { useEffect, useState } from 'react';
import { MenuItem, fetchMenuItems } from '../lib/supabase';

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Coffee', 'Tea', 'Desserts', 'Snacks'];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const data = await fetchMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      <div
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-gray-200">
            Discover our handcrafted beverages and delicious treats
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

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-amber-700"></div>
          </div>
        ) : (
          <>
            {categories
              .filter((cat) => cat !== 'All')
              .map((category) => {
                const categoryItems = menuItems.filter(
                  (item) => item.category === category
                );
                if (
                  selectedCategory !== 'All' &&
                  selectedCategory !== category
                )
                  return null;
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category} className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-amber-600">
                      {category}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                        >
                          <div className="h-56 overflow-hidden">
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold text-gray-900">
                                {item.name}
                              </h3>
                              <span className="text-2xl font-bold text-amber-700">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
