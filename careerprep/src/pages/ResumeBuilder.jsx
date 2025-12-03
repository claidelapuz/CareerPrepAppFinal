 import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// ✅ REAL SUPABASE CLIENT
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Default Values
const defaultValues = {
  work_experience: [
    { position: "", company: "", duration: "", description: "" }
  ],
  education: [
    { degree: "", institution: "", year: "", details: "" }
  ],
  skills: [""],
  interests: [""],
  professional_references: [
    { companyName: "", contactPerson: "", phoneNumber: "", emailAddress: "" }
  ]
};

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { career, department } = location.state || {};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    zip_code: "",
    city: "",
    linkedin_url: "",
    website_url: "",
    summary: "",
    photo_url: "",
    work_experience: [],
    education: [],
    skills: [],
    interests: [],
    professional_references: []
  });

  // ✅ Load User + Saved Resume
  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.auth.getUser();
      const loggedUser = data?.user || null;
      setUser(loggedUser);

      if (!loggedUser) return;

      // Load local storage data
      const savedData = localStorage.getItem(
        `resume_builder_data_${loggedUser.id}`
      );

      if (savedData) {
        const parsed = JSON.parse(savedData);

        setFormData({
          ...defaultValues,
          ...parsed,
          work_experience:
            parsed.work_experience?.length > 0
              ? parsed.work_experience
              : defaultValues.work_experience,

          education:
            parsed.education?.length > 0
              ? parsed.education
              : defaultValues.education,

          skills: parsed.skills?.length ? parsed.skills : defaultValues.skills,
          interests: parsed.interests?.length
            ? parsed.interests
            : defaultValues.interests,

          professional_references:
            parsed.professional_references?.length
              ? parsed.professional_references
              : defaultValues.professional_references
        });

        if (parsed.photo_url) setPhotoPreview(parsed.photo_url);
      } else {
        setFormData(defaultValues);
      }
    };

    loadData();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      return;
    }

    setUser(data.user);
    setFormData((prev) => ({
      ...prev,
      email: data.user.email || ""
    }));
  };

  // Input Handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData({ ...formData, photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Button (Local Only)
  const handleSaveChanges = () => {
    if (user?.id) {
      localStorage.setItem(
        `resume_builder_data_${user.id}`,
        JSON.stringify(formData)
      );
      alert("Changes saved! Your information will remain even if you leave.");
    } else {
      alert("Please log in to save your data.");
    }
  };

  // ========== WORK EXPERIENCE ==========
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      work_experience: [
        ...formData.work_experience,
        { position: "", company: "", duration: "", description: "" }
      ]
    });
  };

  const updateWorkExperience = (index, field, value) => {
    const updated = [...formData.work_experience];
    updated[index][field] = value;
    setFormData({ ...formData, work_experience: updated });
  };

  const removeWorkExperience = (index) => {
    setFormData({
      ...formData,
      work_experience: formData.work_experience.filter((_, i) => i !== index)
    });
  };

  // ========== EDUCATION ==========
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", year: "", details: "" }
      ]
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  // ========== SKILLS ==========
  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const updateSkill = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  // ========== INTERESTS ==========
  const addInterest = () => {
    setFormData({ ...formData, interests: [...formData.interests, ""] });
  };

  const updateInterest = (index, value) => {
    const updated = [...formData.interests];
    updated[index] = value;
    setFormData({ ...formData, interests: updated });
  };

  const removeInterest = (index) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    });
  };

  // ========== REFERENCES ==========
  const addReference = () => {
    setFormData({
      ...formData,
      professional_references: [
        ...formData.professional_references,
        {
          companyName: "",
          contactPerson: "",
          phoneNumber: "",
          emailAddress: ""
        }
      ]
    });
  };

  const updateReference = (index, field, value) => {
    const updated = [...formData.professional_references];
    updated[index][field] = value;
    setFormData({ ...formData, professional_references: updated });
  };

  const removeReference = (index) => {
    setFormData({
      ...formData,
      professional_references: formData.professional_references.filter(
        (_, i) => i !== index
      )
    });
  };

  // Submit
  const handleSubmit = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert("Please fill required fields.");
      return;
    }

    const full_name = `${formData.first_name} ${formData.last_name}`.trim();

    const resumeData = {
      user_id: user?.id || null,
      career_id: career?.id || null,
      full_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      linkedin_url: formData.linkedin_url,
      website_url: formData.website_url,
      summary: formData.summary,
      work_experience: formData.work_experience,
      education: formData.education,
      skills: formData.skills,
      interests: formData.interests,
      professional_references: formData.professional_references,
      photo_url: formData.photo_url
    };

    navigate("/template-selector", {
      state: {
        resumeData,
        career,
        department
      }
    });
  };

  // ⬇️ FROM HERE DOWN IS YOUR UI — I STOP EXACTLY AT `return (`
  return (

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-green-50">
        {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.jpg"
                  alt="CareerPrep Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl shadow-lg"
                />
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                  CareerPrep
                </span>
              </div>
              </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition mb-6"
          >
            <span>← Back to Dashboard</span>
          </button>

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Resume</h1>
            {career && (
              <p className="text-gray-600">Creating resume for: <span className="font-semibold text-green-600">{career.title}</span></p>
            )}
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
              
              <div className="flex gap-6 mb-6">
                {/* Photo Upload Section */}
                <div className="flex-shrink-0">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="block w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <div className="text-4xl text-gray-400 mb-2"></div>
                        <span className="text-xs text-gray-500 text-center px-2">Add photo</span>
                      </>
                    )}
                  </label>
                </div>

                {/* Name Fields */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    placeholder="Zip Code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City/Town</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. San Francisco"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                <button
                  onClick={addWorkExperience}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <span>+ Add</span>
                </button>
              </div>
              <div className="space-y-4">
                {formData.work_experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 bg-stone-50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-gray-600">Experience {index + 1}</span>
                      <button
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2020 - 2023)"
                      value={exp.duration}
                      onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                      className="mt-3 w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                      rows="2"
                      className="mt-3 w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    ></textarea>
                  </div>
                ))}
                {formData.work_experience.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No work experience added yet</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                <button
                  onClick={addEducation}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <span>+ Add</span>
                </button>
              </div>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 bg-stone-50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-gray-600">Education {index + 1}</span>
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                      Delete
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Degree/Certification"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Year (e.g., 2018 - 2022)"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      className="mt-3 w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    />
                  </div>
                ))}
                {formData.education.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No education added yet</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                <button
                  onClick={addSkill}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <span>+ Add</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {formData.skills.length === 0 && (
                <p className="text-center text-gray-500 py-4">No skills added yet</p>
              )}
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Interests</h2>
                <button
                  onClick={addInterest}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <span>+ Add</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.interests.map((interest, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Interest"
                      value={interest}
                      onChange={(e) => updateInterest(index, e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button
                      onClick={() => removeInterest(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {formData.interests.length === 0 && (
                <p className="text-center text-gray-500 py-4">No interests added yet</p>
              )}
            </div>

            {/* Professional References - Updated with detailed fields */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Professional References</h2>
                <button
                  onClick={addReference}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  <span>+ Add</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {formData.professional_references.map((ref, index) => (
                  <div key={index} className="bg-stone-50 rounded-xl p-6 border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={ref.companyName || ''}
                          onChange={(e) => updateReference(index, 'companyName', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          placeholder="Enter contact person"
                          value={ref.contactPerson || ''}
                          onChange={(e) => updateReference(index, 'contactPerson', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          value={ref.phoneNumber || ''}
                          onChange={(e) => updateReference(index, 'phoneNumber', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Enter email address"
                          value={ref.emailAddress || ''}
                          onChange={(e) => updateReference(index, 'emailAddress', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeReference(index)}
                        className="px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {formData.professional_references.length === 0 && (
                <p className="text-center text-gray-500 py-8">No references added yet</p>
              )}
            </div>

            {/* Submit Button */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8">

    {/* BUTTONS SIDE-BY-SIDE */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">

      {/* Save Changes Button - LEFT */}
      <button
        onClick={handleSaveChanges}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Save Changes
      </button>

      {/* Choose Template Button - RIGHT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-12 py-4 bg-white text-green-600 text-lg rounded-xl font-semibold hover:bg-green-50 transition shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <span>Next Step: Choose Template</span>
          </>
        )}
      </button>

    </div>

    {/* Subtitle Below */}
    <p className="mt-4 text-green-50 text-sm text-center">
      Your resume will be saved and you can choose a template in the next step
    </p>

  </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-gray-200 mt-12">
          <div className="text-center text-gray-600 text-sm sm:text-base">
            <p>&copy; 2025 CareerPrep. Build your future with confidence.</p>
          </div>
        </footer>
      </div> 
      
      
    );
  }
  