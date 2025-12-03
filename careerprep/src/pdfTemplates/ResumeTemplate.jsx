import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Template 1: Classic Professional Styles
const styles1 = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 4,
    borderBottomColor: '#2563eb',
    paddingBottom: 15,
    marginBottom: 20,
  },
  photoNameContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 9,
  },
  workExperienceItem: {
    marginBottom: 12,
  },
  educationItem: {
    marginBottom: 10,
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  referenceItem: {
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    paddingLeft: 10,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  referenceText: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 1,
  },
});

// Template 2: Modern Minimal Styles
const styles2 = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: 20,
  },
  mainContent: {
    width: '65%',
    padding: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#10b981',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  accent: {
    height: 3,
    width: 40,
    backgroundColor: '#10b981',
    marginBottom: 15,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  sidebarText: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 4,
  },
  mainSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  mainAccent: {
    height: 2,
    width: 40,
    backgroundColor: '#10b981',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

// Template 3: Creative Colorful Styles
const styles3 = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: '#faf5ff',
  },
  header: {
    backgroundColor: '#9333ea',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#9333ea',
    marginBottom: 8,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
  },
  skillBadge: {
    backgroundColor: '#9333ea',
    color: '#ffffff',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

// Template 4: Professional Sidebar Styles
const styles4 = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '38%',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: 25,
  },
  mainContent: {
    width: '62%',
    padding: 25,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  sidebarSectionHeader: {
    backgroundColor: '#334155',
    padding: 8,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: 'bold',
  },
  sidebarText: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 8,
    paddingLeft: 5,
  },
  skillItem: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 3,
  },
  skillBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    width: '85%',
    borderRadius: 3,
  },
  mainName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  mainAccent: {
    height: 3,
    width: 80,
    backgroundColor: '#1e293b',
    marginBottom: 15,
  },
  mainSectionHeader: {
    backgroundColor: '#334155',
    color: '#ffffff',
    padding: 8,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 12,
  },
});

// Template 1 Component
const Template1 = ({ data }) => (
  <Page size="A4" style={styles1.page}>
    <View style={styles1.header}>
      <View style={styles1.photoNameContainer}>
        {data.photo_url && <Image src={data.photo_url} style={styles1.photo} />}
        <View style={{ flex: 1 }}>
          <Text style={styles1.name}>{data.full_name}</Text>
          {data.email && <Text style={styles1.contactInfo}>📧 {data.email}</Text>}
          {data.phone && <Text style={styles1.contactInfo}>📱 {data.phone}</Text>}
          {data.address && <Text style={styles1.contactInfo}>📍 {data.address}</Text>}
        </View>
      </View>
    </View>

    {data.summary && (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles1.sectionTitle}>Professional Summary</Text>
        <Text style={styles1.summary}>{data.summary}</Text>
      </View>
    )}

    {data.work_experience && data.work_experience.length > 0 && (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles1.sectionTitle}>Work Experience</Text>
        {data.work_experience.map((exp, idx) => (
          <View key={idx} style={styles1.workExperienceItem}>
            <Text style={styles1.jobTitle}>{exp.position}</Text>
            <Text style={styles1.company}>{exp.company} | {exp.duration}</Text>
            {exp.description && <Text style={styles1.description}>{exp.description}</Text>}
          </View>
        ))}
      </View>
    )}

    {data.education && data.education.length > 0 && (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles1.sectionTitle}>Education</Text>
        {data.education.map((edu, idx) => (
          <View key={idx} style={styles1.educationItem}>
            <Text style={styles1.jobTitle}>{edu.degree}</Text>
            <Text style={styles1.company}>{edu.institution} | {edu.year}</Text>
            {edu.details && <Text style={styles1.description}>{edu.details}</Text>}
          </View>
        ))}
      </View>
    )}

    {data.skills && data.skills.length > 0 && (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles1.sectionTitle}>Skills</Text>
        <View style={styles1.skillsContainer}>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles1.skillBadge}>{skill}</Text>
          ))}
        </View>
      </View>
    )}

    {data.interests && data.interests.length > 0 && (
      <View style={{ marginBottom: 15 }}>
        <Text style={styles1.sectionTitle}>Interests</Text>
        <Text style={styles1.description}>{data.interests.join(', ')}</Text>
      </View>
    )}

    {data.professional_references && data.professional_references.length > 0 && (
      <View>
        <Text style={styles1.sectionTitle}>References</Text>
        <View style={styles1.referenceGrid}>
          {data.professional_references.map((ref, idx) => (
            <View key={idx} style={styles1.referenceItem}>
              {ref.contactPerson && <Text style={styles1.referenceName}>{ref.contactPerson}</Text>}
              {ref.companyName && <Text style={styles1.referenceText}>{ref.companyName}</Text>}
              {ref.phoneNumber && <Text style={styles1.referenceText}>📱 {ref.phoneNumber}</Text>}
              {ref.emailAddress && <Text style={styles1.referenceText}>📧 {ref.emailAddress}</Text>}
            </View>
          ))}
        </View>
      </View>
    )}
  </Page>
);

// Template 2 Component
const Template2 = ({ data }) => (
  <Page size="A4" style={styles2.page}>
    <View style={styles2.sidebar}>
      {data.photo_url && <Image src={data.photo_url} style={styles2.photo} />}
      <Text style={styles2.name}>{data.full_name}</Text>
      <View style={styles2.accent} />

      <View style={styles2.sidebarSection}>
        <Text style={styles2.sidebarTitle}>CONTACT</Text>
        {data.email && <Text style={styles2.sidebarText}>📧 {data.email}</Text>}
        {data.phone && <Text style={styles2.sidebarText}>📱 {data.phone}</Text>}
        {data.address && <Text style={styles2.sidebarText}>📍 {data.address}</Text>}
      </View>

      {data.skills && data.skills.length > 0 && (
        <View style={styles2.sidebarSection}>
          <Text style={styles2.sidebarTitle}>SKILLS</Text>
          {data.skills.map((skill, idx) => (
            <Text key={idx} style={styles2.sidebarText}>• {skill}</Text>
          ))}
        </View>
      )}

      {data.interests && data.interests.length > 0 && (
        <View style={styles2.sidebarSection}>
          <Text style={styles2.sidebarTitle}>INTERESTS</Text>
          {data.interests.map((interest, idx) => (
            <Text key={idx} style={styles2.sidebarText}>• {interest}</Text>
          ))}
        </View>
      )}
    </View>

    <View style={styles2.mainContent}>
      {data.summary && (
        <View style={{ marginBottom: 15 }}>
          <Text style={styles2.mainSectionTitle}>PROFILE</Text>
          <View style={styles2.mainAccent} />
          <Text style={styles2.description}>{data.summary}</Text>
        </View>
      )}

      {data.work_experience && data.work_experience.length > 0 && (
        <View style={{ marginBottom: 15 }}>
          <Text style={styles2.mainSectionTitle}>EXPERIENCE</Text>
          <View style={styles2.mainAccent} />
          {data.work_experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles2.jobTitle}>{exp.position}</Text>
              <Text style={styles2.company}>{exp.company} • {exp.duration}</Text>
              {exp.description && <Text style={styles2.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.education && data.education.length > 0 && (
        <View style={{ marginBottom: 15 }}>
          <Text style={styles2.mainSectionTitle}>EDUCATION</Text>
          <View style={styles2.mainAccent} />
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              <Text style={styles2.jobTitle}>{edu.degree}</Text>
              <Text style={styles2.company}>{edu.institution} • {edu.year}</Text>
              {edu.details && <Text style={styles2.description}>{edu.details}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.professional_references && data.professional_references.length > 0 && (
        <View>
          <Text style={styles2.mainSectionTitle}>REFERENCES</Text>
          <View style={styles2.mainAccent} />
          {data.professional_references.map((ref, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              {ref.contactPerson && <Text style={styles2.jobTitle}>{ref.contactPerson}</Text>}
              {ref.companyName && <Text style={styles2.company}>{ref.companyName}</Text>}
              {ref.phoneNumber && <Text style={styles2.description}>{ref.phoneNumber}</Text>}
              {ref.emailAddress && <Text style={styles2.description}>{ref.emailAddress}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  </Page>
);

// Template 3 Component
const Template3 = ({ data }) => (
  <Page size="A4" style={styles3.page}>
    <View style={styles3.header}>
      {data.photo_url && <Image src={data.photo_url} style={styles3.photo} />}
      <View style={{ flex: 1 }}>
        <Text style={styles3.name}>{data.full_name}</Text>
        {data.email && <Text style={styles3.contactInfo}>📧 {data.email}</Text>}
        {data.phone && <Text style={styles3.contactInfo}>📱 {data.phone}</Text>}
        {data.address && <Text style={styles3.contactInfo}>📍 {data.address}</Text>}
      </View>
    </View>

    {data.summary && (
      <View style={styles3.card}>
        <Text style={styles3.sectionTitle}>About Me</Text>
        <Text style={styles3.description}>{data.summary}</Text>
      </View>
    )}

    <View style={styles3.twoColumnContainer}>
      <View style={styles3.column}>
        {data.work_experience && data.work_experience.length > 0 && (
          <View style={styles3.card}>
            <Text style={styles3.sectionTitle}>Experience</Text>
            {data.work_experience.map((exp, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <Text style={styles3.jobTitle}>{exp.position}</Text>
                <Text style={styles3.company}>{exp.company} | {exp.duration}</Text>
                {exp.description && <Text style={styles3.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.education && data.education.length > 0 && (
          <View style={styles3.card}>
            <Text style={styles3.sectionTitle}>Education</Text>
            {data.education.map((edu, idx) => (
              <View key={idx} style={{ marginBottom: 6 }}>
                <Text style={styles3.jobTitle}>{edu.degree}</Text>
                <Text style={styles3.company}>{edu.institution} | {edu.year}</Text>
                {edu.details && <Text style={styles3.description}>{edu.details}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles3.column}>
        {data.skills && data.skills.length > 0 && (
          <View style={styles3.card}>
            <Text style={styles3.sectionTitle}>Skills</Text>
            <View style={styles3.skillsContainer}>
              {data.skills.map((skill, idx) => (
                <Text key={idx} style={styles3.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {data.interests && data.interests.length > 0 && (
          <View style={styles3.card}>
            <Text style={styles3.sectionTitle}>Interests</Text>
            {data.interests.map((interest, idx) => (
              <Text key={idx} style={styles3.description}>🌟 {interest}</Text>
            ))}
          </View>
        )}

        {data.professional_references && data.professional_references.length > 0 && (
          <View style={styles3.card}>
            <Text style={styles3.sectionTitle}>References</Text>
            {data.professional_references.map((ref, idx) => (
              <View key={idx} style={{ marginBottom: 6 }}>
                {ref.contactPerson && <Text style={styles3.jobTitle}>{ref.contactPerson}</Text>}
                {ref.companyName && <Text style={styles3.company}>{ref.companyName}</Text>}
                {ref.phoneNumber && <Text style={styles3.description}>📱 {ref.phoneNumber}</Text>}
                {ref.emailAddress && <Text style={styles3.description}>📧 {ref.emailAddress}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  </Page>
);

// Template 4 Component
const Template4 = ({ data }) => (
  <Page size="A4" style={styles4.page}>
    <View style={styles4.sidebar}>
      {data.photo_url && <Image src={data.photo_url} style={styles4.photo} />}
      
      <View style={{ marginBottom: 20 }}>
        <Text style={styles4.sidebarSectionHeader}>CONTACT</Text>
        {data.email && <Text style={styles4.sidebarText}>📧 {data.email}</Text>}
        {data.phone && <Text style={styles4.sidebarText}>📱 {data.phone}</Text>}
        {data.address && <Text style={styles4.sidebarText}>📍 {data.address}</Text>}
      </View>

      {data.skills && data.skills.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={styles4.sidebarSectionHeader}>SKILLS</Text>
          {data.skills.map((skill, idx) => (
            <View key={idx} style={styles4.skillItem}>
              <Text style={styles4.skillName}>{skill}</Text>
              <View style={styles4.skillBar}>
                <View style={styles4.skillFill} />
              </View>
            </View>
          ))}
        </View>
      )}

      {data.interests && data.interests.length > 0 && (
        <View>
          <Text style={styles4.sidebarSectionHeader}>INTERESTS</Text>
          {data.interests.map((interest, idx) => (
            <Text key={idx} style={styles4.sidebarText}>▪ {interest}</Text>
          ))}
        </View>
      )}
    </View>

    <View style={styles4.mainContent}>
      <Text style={styles4.mainName}>{data.full_name}</Text>
      <View style={styles4.mainAccent} />
      {data.summary && <Text style={styles4.description}>{data.summary}</Text>}

      {data.education && data.education.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <Text style={styles4.mainSectionHeader}>EDUCATION</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles4.jobTitle}>{edu.degree}</Text>
              <Text style={styles4.company}>{edu.institution} | {edu.year}</Text>
              {edu.details && <Text style={styles4.description}>{edu.details}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.work_experience && data.work_experience.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <Text style={styles4.mainSectionHeader}>WORK EXPERIENCE</Text>
          {data.work_experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={styles4.jobTitle}>{exp.company}</Text>
              <Text style={styles4.company}>{exp.position} | {exp.duration}</Text>
              {exp.description && <Text style={styles4.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.professional_references && data.professional_references.length > 0 && (
        <View style={{ marginTop: 15 }}>
          <Text style={styles4.mainSectionHeader}>REFERENCES</Text>
          {data.professional_references.map((ref, idx) => (
            <View key={idx} style={{ marginBottom: 8 }}>
              {ref.contactPerson && <Text style={styles4.jobTitle}>{ref.contactPerson}</Text>}
              {ref.companyName && <Text style={styles4.company}>{ref.companyName}</Text>}
              {ref.phoneNumber && <Text style={styles4.description}>📱 {ref.phoneNumber}</Text>}
              {ref.emailAddress && <Text style={styles4.description}>📧 {ref.emailAddress}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  </Page>
);

// Main component that selects which template to render
const templateMap = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
};

export const pdfTemplates = templateMap;

export default function ResumeTemplate({ data, templateId = 'template1' }) {
  const SelectedTemplate = templateMap[templateId] || Template1;

  return (
    <Document>
      <SelectedTemplate data={data} />
    </Document>
  );
}