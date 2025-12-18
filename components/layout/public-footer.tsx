import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Brooklyn Hills Apartments
            </h3>
            <p className="text-sm">
              Premium shortlet apartments across Nigeria with modern amenities
              and exceptional service.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <p className="text-sm">Email: info@brooklynhills.ng</p>
            <p className="text-sm">Phone: +234 XXX XXX XXXX</p>
            <p className="text-sm mt-2">
              <a
                href="https://wa.me/234XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                WhatsApp Us
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Brooklyn Hills Apartments. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
