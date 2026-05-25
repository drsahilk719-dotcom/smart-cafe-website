import { Coffee, Users, Award, Heart, Leaf, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-200">
            Passion, Quality, and Community in Every Cup
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Founded in 2020, smart cafe began as a dream to create more than just another coffee shop.
                We envisioned a space where community, quality, and creativity converge—a place where every
                visitor feels at home.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our journey started with two passionate coffee enthusiasts who believed that exceptional
                coffee could bring people together. Today, we've grown into a beloved neighborhood gathering
                spot, serving hundreds of satisfied customers daily.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every bean is carefully selected, every recipe meticulously perfected, and every customer
                treated like family. This commitment to excellence is what makes smart cafe special.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/3970333/pexels-photo-3970333.jpeg"
                alt="Café interior"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg"
                alt="Barista at work"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Coffee className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise on quality. From sourcing premium beans to perfecting our brewing
                techniques, excellence is our standard.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We're more than a café—we're a gathering place. Building connections and fostering
                community is at the heart of what we do.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to ethical sourcing and environmentally responsible practices that
                protect our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-700 to-stone-800 rounded-2xl p-12 text-white text-center shadow-2xl">
            <p className="text-2xl leading-relaxed mb-6">
              "To craft exceptional coffee experiences that inspire connection, creativity, and joy
              in our community, while honoring the artistry of coffee making and the people behind
              every bean."
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-gray-200">Cups Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9</div>
                <div className="text-gray-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-gray-200">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Award-Winning Coffee</h3>
              <p className="text-gray-600">
                Recognized locally and nationally for our exceptional coffee quality
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Made with Passion</h3>
              <p className="text-gray-600">
                Every drink is crafted with care by our experienced baristas
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Leaf className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethically Sourced</h3>
              <p className="text-gray-600">
                Direct trade relationships with farmers ensuring fair prices
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Trained and certified baristas passionate about coffee
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Coffee className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Equipment</h3>
              <p className="text-gray-600">
                State-of-the-art espresso machines and brewing tools
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistent Quality</h3>
              <p className="text-gray-600">
                Same great taste and experience every single time
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
