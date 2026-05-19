import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "./types";

interface PdfTemplateProps {
  data: ResumeData;
}

const formatPeriod = (
  startMonth: string,
  startYear: string,
  endMonth: string,
  endYear: string,
  current?: boolean
) => {
  const months: Record<string, string> = {
    "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr", "05": "Mai", "06": "Jun",
    "07": "Jul", "08": "Ago", "09": "Set", "10": "Out", "11": "Nov", "12": "Dez"
  };
  const getMonthLabel = (m: string) => months[m] || m;

  const start = startMonth && startYear ? `${getMonthLabel(startMonth)}/${startYear}` : "";
  if (current) {
    return start ? `${start} - Atual` : "Atual";
  }
  const end = endMonth && endYear ? `${getMonthLabel(endMonth)}/${endYear}` : "";
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
};

export function PdfTemplate({ data }: PdfTemplateProps) {
  const { template, name, title, email, phone, address, summary, photoUrl, experiences, educations } = data;

  if (template === "modern") {
    return (
      <Document>
        <Page size="A4" style={styles.modernPage}>
          {/* Sidebar */}
          <View style={styles.modernSidebar}>
            {photoUrl && (
              <Image src={photoUrl} style={styles.modernPhoto} />
            )}
            
            <View style={styles.sectionContainer}>
              <Text style={styles.modernSidebarTitle}>Contato</Text>
              <View style={styles.modernSidebarContent}>
                {email && (
                  <View style={styles.contactItem}>
                    <Text style={styles.boldLabel}>E-mail:</Text>
                    <Text>{email}</Text>
                  </View>
                )}
                {phone && (
                  <View style={styles.contactItem}>
                    <Text style={styles.boldLabel}>Telefone:</Text>
                    <Text>{phone}</Text>
                  </View>
                )}
                {address && (
                  <View style={styles.contactItem}>
                    <Text style={styles.boldLabel}>Endereço:</Text>
                    <Text>{address}</Text>
                  </View>
                )}
              </View>
            </View>

            {educations.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.modernSidebarTitle}>Formação</Text>
                {educations.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.boldLabel}>{edu.course}</Text>
                    <Text style={styles.textMuted}>{edu.institution}</Text>
                    <Text style={styles.textDate}>
                      {formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.modernMain}>
            <View style={styles.header}>
              <Text style={styles.modernName}>{name || "Seu Nome"}</Text>
              {title && <Text style={styles.modernTitle}>{title}</Text>}
            </View>

            {summary && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionTitleModern}>Sobre Mim</Text>
                <Text style={styles.paragraph}>{summary}</Text>
              </View>
            )}

            {experiences.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionTitleModern}>Experiência</Text>
                {experiences.map((exp) => (
                  <View key={exp.id} style={styles.experienceItemModern}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitle}>{exp.title}</Text>
                      <Text style={styles.textDate}>
                        {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                    <Text style={styles.paragraph}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  }

  if (template === "executive") {
    return (
      <Document>
        <Page size="A4" style={styles.executivePage}>
          <View style={styles.executiveHeader}>
            {photoUrl && (
              <Image src={photoUrl} style={styles.executivePhoto} />
            )}
            <Text style={styles.executiveName}>{name || "Seu Nome"}</Text>
            {title && <Text style={styles.executiveTitle}>{title}</Text>}
            
            <View style={styles.executiveContactRow}>
              {address && <Text style={styles.executiveContactText}>{address}</Text>}
              {address && (phone || email) && <Text style={styles.bullet}>•</Text>}
              {phone && <Text style={styles.executiveContactText}>{phone}</Text>}
              {phone && email && <Text style={styles.bullet}>•</Text>}
              {email && <Text style={styles.executiveContactText}>{email}</Text>}
            </View>
          </View>

          {summary && (
            <View style={styles.executiveSummarySection}>
              <Text style={styles.executiveSummaryText}>{summary}</Text>
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleExecutive}>Experiência Profissional</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.item}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.boldTitle}>{exp.title}</Text>
                    <Text style={styles.italicDate}>
                      {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                    </Text>
                  </View>
                  <Text style={styles.companySub}>{exp.company}</Text>
                  <Text style={styles.executiveParagraph}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitleExecutive}>Formação Acadêmica</Text>
              {educations.map((edu) => (
                <View key={edu.id} style={styles.item}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.boldTitle}>{edu.course}</Text>
                    <Text style={styles.italicDate}>
                      {formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}
                    </Text>
                  </View>
                  <Text style={styles.companySub}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  }

  // Default / Minimalist template
  return (
    <Document>
      <Page size="A4" style={styles.minimalistPage}>
        <View style={styles.minimalistHeader}>
          {photoUrl && (
            <Image src={photoUrl} style={styles.minimalistPhoto} />
          )}
          <View style={styles.minimalistHeaderText}>
            <Text style={styles.minimalistName}>{name || "Seu Nome"}</Text>
            {title && <Text style={styles.minimalistTitle}>{title}</Text>}
            <View style={styles.minimalistContactRow}>
              {email && <Text style={styles.contactItemText}>{email}</Text>}
              {phone && <Text style={styles.contactItemText}>{phone}</Text>}
              {address && <Text style={styles.contactItemText}>{address}</Text>}
            </View>
          </View>
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleMinimalist}>Perfil Profissional</Text>
            <Text style={styles.paragraph}>{summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleMinimalist}>Experiência Profissional</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.boldTitle}>{exp.title}</Text>
                  <Text style={styles.textDate}>
                    {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                  </Text>
                </View>
                <Text style={styles.companySub}>{exp.company}</Text>
                <Text style={styles.paragraph}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {educations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitleMinimalist}>Formação Acadêmica</Text>
            {educations.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.rowBetween}>
                  <Text style={styles.boldTitle}>{edu.course}</Text>
                  <Text style={styles.textDate}>
                    {formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}
                  </Text>
                </View>
                <Text style={styles.companySub}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  // Modern Template Styles
  modernPage: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  modernSidebar: {
    width: "33.33%",
    backgroundColor: "#f3f4f6",
    padding: 24,
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  modernSidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 4,
    marginBottom: 8,
  },
  modernSidebarContent: {
    flexDirection: "column",
    gap: 8,
  },
  contactItem: {
    marginBottom: 6,
  },
  boldLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 1,
  },
  educationItem: {
    marginBottom: 10,
  },
  textMuted: {
    fontSize: 8,
    color: "#4b5563",
  },
  modernMain: {
    width: "66.66%",
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  modernName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: -0.5,
  },
  modernTitle: {
    fontSize: 11,
    color: "#4b5563",
    marginTop: 2,
  },
  mainSection: {
    marginBottom: 16,
  },
  sectionTitleModern: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1.5,
    borderBottomColor: "#111827",
    paddingBottom: 4,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.4,
  },
  experienceItemModern: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  experienceTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#111827",
  },
  experienceCompany: {
    fontSize: 8,
    color: "#4b5563",
    marginBottom: 4,
  },
  modernPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: "center",
    marginBottom: 16,
  },

  // Executive Template Styles
  executivePage: {
    padding: 32,
    backgroundColor: "#ffffff",
    fontFamily: "Times-Roman",
  },
  executiveHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  executivePhoto: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginBottom: 10,
  },
  executiveName: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  executiveTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#4b5563",
    marginBottom: 6,
  },
  executiveContactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  executiveContactText: {
    fontSize: 8,
    color: "#4b5563",
  },
  bullet: {
    fontSize: 8,
    color: "#9ca3af",
  },
  executiveSummarySection: {
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  executiveSummaryText: {
    fontSize: 9,
    fontFamily: "Times-Italic",
    color: "#111827",
    textAlign: "center",
    lineHeight: 1.4,
  },
  sectionTitleExecutive: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    paddingBottom: 4,
    marginBottom: 10,
  },
  executiveParagraph: {
    fontSize: 9,
    color: "#111827",
    lineHeight: 1.4,
    textAlign: "justify",
  },

  // Minimalist Template Styles
  minimalistPage: {
    padding: 32,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  minimalistHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#111827",
    paddingBottom: 12,
    marginBottom: 16,
  },
  minimalistPhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  minimalistHeaderText: {
    flex: 1,
  },
  minimalistName: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  minimalistTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4b5563",
    marginTop: 2,
  },
  minimalistContactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  contactItemText: {
    fontSize: 8,
    color: "#4b5563",
  },
  sectionTitleMinimalist: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  // Common Styles
  section: {
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  item: {
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  boldTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1f2937",
  },
  companySub: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 4,
  },
  textDate: {
    fontSize: 8,
    color: "#6b7280",
  },
  italicDate: {
    fontSize: 8,
    fontFamily: "Times-Italic",
    color: "#4b5563",
  },
});
