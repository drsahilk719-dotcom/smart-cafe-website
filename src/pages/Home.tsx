import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Heart, Award, Star } from 'lucide-react';
import { supabase, MenuItem, Testimonial } from '../lib/supabase';

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: menuData } = await supabase
        .from('menu_items')
        .select('*')
        .limit(3);

      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (menuData) setFeaturedItems(menuData);
      if (testimonialsData) setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to smart cafe
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Where Every Cup Tells a Story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              View Menu <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all border border-white/30"
            >
              Visit Us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Daily Escape
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At smart cafe, we believe that coffee is more than just a beverage—it's an experience.
                Every cup is crafted with precision, passion, and the finest beans sourced from around the world.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our cozy atmosphere provides the perfect backdrop for catching up with friends,
                diving into a good book, or finding your creative flow. We're not just serving coffee;
                we're creating moments worth savoring.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
              >
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg"
                alt="Coffee beans"
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/1892933/pexels-photo-1892933.jpeg"
                alt="Coffee making"
                className="rounded-lg shadow-lg h-64 w-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Discover what makes smart cafe special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:bg-amber-50 transition-colors">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600">
                We source the finest beans and use state-of-the-art equipment to ensure every cup is perfect.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:bg-amber-50 transition-colors">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Made with Love</h3>
              <p className="text-gray-600">
                Our passionate baristas pour their heart into every creation, ensuring an unforgettable experience.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl hover:bg-amber-50 transition-colors">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Award Winning</h3>
              <p className="text-gray-600">
                Recognized for excellence in coffee craftsmanship and customer service year after year.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Menu
            </h2>
            <p className="text-lg text-gray-600">
              Try our customer favorites
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <span className="text-xl font-bold text-amber-700">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <span className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              View Full Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real reviews from real coffee lovers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-4 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonial.customer_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
