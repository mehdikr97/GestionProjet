import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  return (
    <footer className="text-white px-8 py-6 bg-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Colonne 1 */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">INFO</h3>
          <p className="mb-2">123 Hay Najat , Beni melel, Maroc</p>
          <p className="mb-2">
            <a href="tel:+1514890000" className="hover:text-yellow-400">
            +212679624241
            </a>
          </p>
          <p>
            <a
              href="mailto:calinscompagnies@calins.com"
              className="hover:text-yellow-400"
            >
              calinscompagnies@calins.com
            </a>
          </p>
        </div>

        {/* Colonne 2 */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4"></h3>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Delivery Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Our Stores
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Work at Hugs
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4"></h3>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-400">
                My Personal Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                My Addresses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                My Orders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                My Favorites
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 4 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="mb-4">
            <li>
              <a href="tel:+1514890000" className="hover:text-yellow-400">
+212679624241              </a>
            </li>
            <li>
              <a
                href="Email :mehdikarkouri7@gmail.com"
                className="hover:text-yellow-400"
              >
                Send mail
              </a>
            </li>
          </ul>
          <div className="mt-4 icons">
            <a href="#" className="mr-2">
              <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:text-yellow-400" />
            </a>
            <a href="#" className="mr-2">
              <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:text-yellow-400" />
            </a>
            <a href="mailto:calinscompagnies@calins.com">
              <FontAwesomeIcon icon={faEnvelope} className="text-2xl hover:text-yellow-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-8">&copy; 2025 - All rights reserved / EL MEHDI EL KARKORI</p>
    </footer>
  );
};

export default Footer;