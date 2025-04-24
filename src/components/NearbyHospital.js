import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, ChevronRight, Search, Loader } from 'lucide-react';

// Mock data for demonstration purposes
// In a real implementation, this would come from Google Maps API
const mockHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: "1.2 km",
    address: "123 Main Street, City Center",
    phone: "+1 555-123-4567",
    emergency: true,
    rating: 4.7,
    openNow: true,
    services: ["Emergency", "ICU", "Pediatrics", "Cardiology"]
  },
  {
    id: 2,
    name: "Community Medical Center",
    distance: "2.5 km",
    address: "456 Oak Avenue, Downtown",
    phone: "+1 555-987-6543",
    emergency: true,
    rating: 4.3,
    openNow: true,
    services: ["Emergency", "Orthopedics", "Neurology"]
  },
  {
    id: 3,
    name: "Sunshine Hospital & Research",
    distance: "3.8 km",
    address: "789 Sunshine Blvd, Eastside",
    phone: "+1 555-789-0123",
    emergency: false,
    rating: 4.9,
    openNow: false,
    services: ["Cancer Care", "Surgery", "Rehabilitation"]
  },
  {
    id: 4,
    name: "Riverside Medical Facility",
    distance: "4.1 km",
    address: "321 River Road, Westside",
    phone: "+1 555-456-7890",
    emergency: true,
    rating: 4.1,
    openNow: true,
    services: ["Emergency", "Trauma Center", "Pediatrics"]
  }
];

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmergency, setFilterEmergency] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmergency = filterEmergency ? hospital.emergency : true;
    return matchesSearch && matchesEmergency;
  });

  const handleCallNow = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Nearby Hospitals</h2>
        <p className="opacity-90">Find emergency services and medical facilities near you</p>
      </div>
      
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or location" 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="emergency-filter" 
            className="mr-2"
            checked={filterEmergency}
            onChange={() => setFilterEmergency(!filterEmergency)} 
          />
          <label htmlFor="emergency-filter" className="text-gray-700">Emergency Services Only</label>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-1/2 h-96 lg:h-auto bg-gray-100 p-4 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Finding nearby hospitals...</span>
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No hospitals found matching your criteria
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHospitals.map(hospital => (
                <div 
                  key={hospital.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedHospital === hospital.id ? 'bg-blue-50 border-blue-400' : 'border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setSelectedHospital(hospital.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{hospital.name}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hospital.distance} • {hospital.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700 flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {hospital.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hospital.emergency && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                        Emergency
                      </span>
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded ${hospital.openNow ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {hospital.openNow ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCallNow(hospital.phone);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </button>
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:w-1/2 p-6 bg-white">
          {selectedHospital ? (
            <>
              {hospitals.filter(h => h.id === selectedHospital).map(hospital => (
                <div key={hospital.id} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{hospital.name}</h2>
                    <div className="flex items-center mt-2">
                      <Star className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="font-medium">{hospital.rating}</span>
                      <span className="mx-2">•</span>
                      <span className={`text-sm ${hospital.openNow ? 'text-green-600' : 'text-red-600'}`}>
                        {hospital.openNow ? 'Open Now' : 'Currently Closed'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">{hospital.phone}</p>
                          <button 
                            className="text-blue-600 text-sm font-medium hover:underline mt-1"
                            onClick={() => handleCallNow(hospital.phone)}
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <p>{hospital.address}</p>
                          <p className="text-sm text-gray-600 mt-1">{hospital.distance} from your location</p>
                          <button className="text-blue-600 text-sm font-medium hover:underline mt-1">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Available Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {hospital.services.map((service, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Emergency Response
                    </h3>
                    <p className="text-blue-700 mt-2">
                      In case of emergency, call {hospital.phone} for immediate assistance. 
                      Their ambulance service is available 24/7.
                    </p>
                  </div>
                  
                  <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Google Maps would display here with hospital location
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-full flex-col text-gray-500">
              <MapPin className="w-12 h-12 mb-4 text-blue-400" />
              <p className="text-lg">Select a hospital to view details</p>
              <p className="text-center mt-2 text-sm max-w-md">
                Get detailed information about facilities, services, and emergency contact numbers
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}