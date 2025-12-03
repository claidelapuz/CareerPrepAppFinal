import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Check } from 'lucide-react';
import { pdf, Document } from "@react-pdf/renderer";
import ResumeTemplate, { pdfTemplates } from "../pdfTemplates/ResumeTemplate.jsx";




// Template 1: Classic Professional
const Template1 = ({ data }) => (
  <div className="bg-white p-8 shadow-lg" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Header */}
    <div className="border-b-4 border-blue-600 pb-4 mb-6">
      <div className="flex items-start gap-6">
        {data.photo_url && (
          <img
            src={data.photo_url}
            alt={data.full_name}
            className="w-24 h-24 object-cover rounded-lg border-2 border-blue-600"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.full_name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.email && <span>📧 {data.email}</span>}
            {data.phone && <span>📱 {data.phone}</span>}
            {data.address && <span>📍 {data.address}</span>}
          </div>
          {(data.linkedin_url || data.website_url) && (
            <div className="flex flex-wrap gap-4 text-sm text-blue-600 mt-2">
              {data.linkedin_url && <a href={data.linkedin_url}>LinkedIn</a>}
              {data.website_url && <a href={data.website_url}>Portfolio</a>}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-2 uppercase">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    {/* Work Experience */}
    {data.work_experience && data.work_experience.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase">Work Experience</h2>
        <div className="space-y-4">
          {data.work_experience.map((exp, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-gray-900">{exp.position}</h3>
              <div className="text-sm text-gray-600 mb-1">
                {exp.company} | {exp.duration}
              </div>
              {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {data.education && data.education.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase">Education</h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <div className="text-sm text-gray-600">{edu.institution} | {edu.year}</div>
              {edu.details && <p className="text-sm text-gray-700">{edu.details}</p>}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills && data.skills.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Interests */}
    {data.interests && data.interests.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase">Interests</h2>
        <p className="text-gray-700">{data.interests.join(', ')}</p>
      </div>
    )}

    {/* References */}
    {data.professional_references && data.professional_references.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase">References</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.professional_references.map((ref, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-3">
              {ref.contactPerson && <h3 className="font-bold text-gray-900">{ref.contactPerson}</h3>}
              {ref.companyName && <p className="text-sm text-gray-600">{ref.companyName}</p>}
              {ref.phoneNumber && <p className="text-sm text-gray-600">📱 {ref.phoneNumber}</p>}
              {ref.emailAddress && <p className="text-sm text-gray-600">📧 {ref.emailAddress}</p>}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Template 2: Modern Minimal
const Template2 = ({ data }) => (
  <div className="bg-white p-8 shadow-lg" style={{ minHeight: '297mm', width: '210mm' }}>
    <div className="grid grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-800 text-white p-6 -m-8 mr-0">
        {data.photo_url && (
          <div className="mb-6">
            <img
              src={data.photo_url}
              alt={data.full_name}
              className="w-32 h-32 object-cover rounded-lg mx-auto border-4 border-green-500"
            />
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{data.full_name}</h1>
          <div className="h-1 w-12 bg-green-500 mb-4"></div>
        </div>

        {/* Contact */}
        <div className="mb-6 text-sm space-y-2">
          {data.email && <div>📧 {data.email}</div>}
          {data.phone && <div>📱 {data.phone}</div>}
          {data.address && <div>📍 {data.address}</div>}
          {data.linkedin_url && <div className="break-all text-green-400">🔗 LinkedIn</div>}
          {data.website_url && <div className="break-all text-green-400">🌐 Portfolio</div>}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-green-400">SKILLS</h2>
            <div className="space-y-1 text-sm">
              {data.skills.map((skill, idx) => (
                <div key={idx}>• {skill}</div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-green-400">INTERESTS</h2>
            <div className="space-y-1 text-sm">
              {data.interests.map((interest, idx) => (
                <div key={idx}>• {interest}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="col-span-2">
        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">PROFILE</h2>
            <div className="h-1 w-12 bg-green-500 mb-3"></div>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.work_experience && data.work_experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">EXPERIENCE</h2>
            <div className="h-1 w-12 bg-green-500 mb-3"></div>
            <div className="space-y-4">
              {data.work_experience.map((exp, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <div className="text-sm text-gray-600 italic mb-1">
                    {exp.company} • {exp.duration}
                  </div>
                  {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">EDUCATION</h2>
            <div className="h-1 w-12 bg-green-500 mb-3"></div>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <div className="text-sm text-gray-600 italic">
                    {edu.institution} • {edu.year}
                  </div>
                  {edu.details && <p className="text-sm text-gray-700">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.professional_references && data.professional_references.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">REFERENCES</h2>
            <div className="h-1 w-12 bg-green-500 mb-3"></div>
            <div className="grid grid-cols-2 gap-3">
              {data.professional_references.map((ref, idx) => (
                <div key={idx} className="text-sm">
                  {ref.contactPerson && <h3 className="font-bold text-gray-900">{ref.contactPerson}</h3>}
                  {ref.companyName && <p className="text-gray-600">{ref.companyName}</p>}
                  {ref.phoneNumber && <p className="text-gray-600">{ref.phoneNumber}</p>}
                  {ref.emailAddress && <p className="text-gray-600">{ref.emailAddress}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Template 3: Creative Colorful
const Template3 = ({ data }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Header */}
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl mb-6 shadow-xl">
      <div className="flex items-center gap-4">
        {data.photo_url && (
          <img
            src={data.photo_url}
            alt={data.full_name}
            className="w-20 h-20 object-cover rounded-full border-4 border-white"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">{data.full_name}</h1>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.email && <div>📧 {data.email}</div>}
            {data.phone && <div>📱 {data.phone}</div>}
            {data.address && <div className="col-span-2">📍 {data.address}</div>}
          </div>
        </div>
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="bg-white rounded-xl p-5 mb-4 shadow-md">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          About Me
        </h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    <div className="grid grid-cols-2 gap-4">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Work Experience */}
        {data.work_experience && data.work_experience.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Experience
            </h2>
            <div className="space-y-3">
              {data.work_experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-purple-400 pl-3">
                  <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                  <div className="text-xs text-gray-600 mb-1">
                    {exp.company} | {exp.duration}
                  </div>
                  {exp.description && <p className="text-gray-700 text-xs">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-pink-400 pl-3">
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <div className="text-xs text-gray-600">{edu.institution} | {edu.year}</div>
                  {edu.details && <p className="text-xs text-gray-700">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Interests
            </h2>
            <div className="space-y-1 text-sm text-gray-700">
              {data.interests.map((interest, idx) => (
                <div key={idx}>🌟 {interest}</div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.professional_references && data.professional_references.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              References
            </h2>
            <div className="space-y-3">
              {data.professional_references.map((ref, idx) => (
                <div key={idx} className="text-xs border-l-4 border-purple-400 pl-3">
                  {ref.contactPerson && <h3 className="font-bold text-gray-900">{ref.contactPerson}</h3>}
                  {ref.companyName && <p className="text-gray-600">{ref.companyName}</p>}
                  {ref.phoneNumber && <p className="text-gray-600">📱 {ref.phoneNumber}</p>}
                  {ref.emailAddress && <p className="text-gray-600">📧 {ref.emailAddress}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Template 4: Professional Sidebar
const Template4 = ({ data }) => (
  <div className="bg-white flex" style={{ minHeight: '297mm', width: '210mm' }}>
    {/* Left Sidebar - Dark Blue */}
    <div className="w-2/5 bg-slate-800 text-white p-8">
      {/* Photo */}
      {data.photo_url && (
        <div className="mb-6">
          <img
            src={data.photo_url}
            alt={data.full_name}
            className="w-32 h-32 object-cover rounded-lg mx-auto border-4 border-white"
          />
        </div>
      )}

      {/* Contact Section */}
      <div className="mb-8">
        <div className="bg-slate-700 px-4 py-2 mb-3 font-bold text-lg">
          CONTACT
        </div>
        <div className="space-y-3 text-sm px-2">
          {data.email && (
            <div className="flex items-start space-x-2">
              <span>📧</span>
              <span className="break-all">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-start space-x-2">
              <span>📱</span>
              <span>{data.phone}</span>
            </div>
          )}
          {data.address && (
            <div className="flex items-start space-x-2">
              <span>📍</span>
              <span>{data.address}</span>
            </div>
          )}
          {data.linkedin_url && (
            <div className="flex items-start space-x-2">
              <span>🔗</span>
              <span className="break-all text-blue-300">LinkedIn</span>
            </div>
          )}
          {data.website_url && (
            <div className="flex items-start space-x-2">
              <span>🌐</span>
              <span className="break-all text-blue-300">Portfolio</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <div className="bg-slate-700 px-4 py-2 mb-3 font-bold text-lg">
            SKILLS
          </div>
          <div className="space-y-3 px-2">
            {data.skills.map((skill, idx) => (
              <div key={idx}>
                <div className="text-sm mb-1">{skill}</div>
                <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests Section */}
      {data.interests && data.interests.length > 0 && (
        <div>
          <div className="bg-slate-700 px-4 py-2 mb-3 font-bold text-lg">
            INTERESTS
          </div>
          <div className="space-y-2 text-sm px-2">
            {data.interests.map((interest, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-lg">▪</span>
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Right Content Area */}
    <div className="w-3/5 p-8">
      {/* Name Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-1">{data.full_name}</h1>
        <div className="h-1 w-24 bg-slate-800"></div>
        {data.summary && (
          <p className="text-gray-700 text-sm mt-4 leading-relaxed">{data.summary}</p>
        )}
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <div className="bg-slate-700 text-white px-4 py-2 mb-3 font-bold text-base">
          PERSONAL INFORMATION
        </div>
        <div className="text-sm text-gray-700 space-y-1 px-2">
          <p className="italic">Highly creative and multitalented professional with extensive experience and collaborative skills.</p>
        </div>
      </div>

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <div className="bg-slate-700 text-white px-4 py-2 mb-3 font-bold text-base">
            EDUCATION
          </div>
          <div className="space-y-4 px-2">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 text-sm">{edu.year}</span>
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                    <p className="text-gray-600 text-xs">{edu.institution}</p>
                    {edu.details && <p className="text-gray-600 text-xs mt-1">{edu.details}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience Section */}
      {data.work_experience && data.work_experience.length > 0 && (
        <div className="mb-6">
          <div className="bg-slate-700 text-white px-4 py-2 mb-3 font-bold text-base">
            WORK EXPERIENCE
          </div>
          <div className="space-y-4 px-2">
            {data.work_experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-800 text-sm whitespace-nowrap">{exp.duration}</span>
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-slate-800 text-sm">{exp.company}</h3>
                    <p className="text-gray-700 text-xs font-semibold mb-1">{exp.position}</p>
                    {exp.description && (
                      <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References Section */}
      {data.professional_references && data.professional_references.length > 0 && (
        <div>
          <div className="bg-slate-700 text-white px-4 py-2 mb-3 font-bold text-base">
            REFERENCES
          </div>
          <div className="grid grid-cols-1 gap-3 px-2">
            {data.professional_references.map((ref, idx) => (
              <div key={idx} className="text-xs">
                {ref.contactPerson && <h3 className="font-bold text-slate-800">{ref.contactPerson}</h3>}
                {ref.companyName && <p className="text-gray-600">{ref.companyName}</p>}
                {ref.phoneNumber && <p className="text-gray-600">📱 {ref.phoneNumber}</p>}
                {ref.emailAddress && <p className="text-gray-600">📧 {ref.emailAddress}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function TemplateSelector() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeData } = location.state || {};
  
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const printRef = useRef();

  // Redirect if no resume data
  if (!resumeData) {
    navigate('/resume-builder');
    return null;
  }

  const templates = [
    { id: 'template1', name: 'Classic Professional', component: Template1 },
    { id: 'template2', name: 'Modern Minimal', component: Template2 },
    { id: 'template3', name: 'Creative Colorful', component: Template3 },
    { id: 'template4', name: 'Professional Sidebar', component: Template4 },
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || Template1;

  const handleDownload = async () => {
  try {
    // Ensure we render the exact PDF template component selected
    const SelectedPdfComponent = pdfTemplates[selectedTemplate] || pdfTemplates['template1'];

    if (!SelectedPdfComponent) {
      alert('Selected template not available for PDF generation.');
      return;
    }

    // Build a Document with the selected PDF template component
    const docElement = (
      <Document>
        <SelectedPdfComponent data={resumeData} />
      </Document>
    );

    // Generate PDF blob with the selected template
    const blob = await pdf(docElement).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.full_name.replace(/\s+/g, '_')}_Resume.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-green-50">
      {/* Header - Hidden when printing */}
      <nav className="bg-white shadow-sm border-b border-gray-200 print:hidden">
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
      <div className="container mx-auto px-4 sm:px-6 py-8 print:hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate('/resume-builder', { state: location.state })}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Edit Resume</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
          <p className="text-gray-600">Select a template design for your resume</p>
        </div>

        {/* Template Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`relative bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition transform hover:-translate-y-1 border-2 ${
                selectedTemplate === template.id
                  ? 'border-green-500 ring-4 ring-green-200'
                  : 'border-transparent'
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1.5 z-10">
                  <Check size={16} />
                </div>
              )}
              <div className="bg-gray-50 rounded-lg mb-3 overflow-hidden border border-gray-200" style={{ height: '280px' }}>
                <div className="scale-[0.28] origin-top-left" style={{ width: '210mm', height: '297mm' }}>
                  <template.component data={resumeData} />
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900">{template.name}</h3>
            </button>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleDownload}
              className="px-12 py-4 bg-white text-green-600 text-lg rounded-xl font-semibold hover:bg-green-50 transition shadow-xl flex items-center space-x-3"
            >
              <Download size={24} />
              <span>Download as PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview - Shown when printing */}
      <div ref={printRef} className="hidden print:block">
        <SelectedTemplateComponent data={resumeData} />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* Force backgrounds and colors to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body * {
            visibility: hidden;
          }
          .print\\:block, .print\\:block * {
            visibility: visible;
          }
          .print\\:block {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Ensure gradients print */
          .bg-gradient-to-r,
          .bg-gradient-to-br,
          .bg-gradient-to-l {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}