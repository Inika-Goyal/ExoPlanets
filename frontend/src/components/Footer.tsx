import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0e1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6"></div>
            <p className="text-gray-400 text-sm">
              Exploring the mysteries of the universe, one discovery at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Research</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Gallery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            Website created by Sara Khan, Inika Goyal, Bhumika, Lucas Kritz, Shanmukh Upadhyayula, and Albert Szewczyk
          </p>
          {/* social icons removed */}
          <div className="flex gap-6 mt-4 md:mt-0" />
        </div>
      </div>
    </footer>
  );
};
