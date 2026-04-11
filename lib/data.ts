export type Tool = {
  name: string;
  description: string;
  url: string;
  license: "open-source" | "commercial" | "freemium";
  tags: string[];
};

export type Role = {
  title: string;
  description: string;
  certifications: string[];
};

export type Team = {
  name: string;
  description: string;
};

export type ColorTeam = {
  id: string;
  name: string;
  hex: string;
  textHex: string;
  tagline: string;
  description: string;
  teams: Team[];
  tools: Tool[];
  roles: Role[];
};

export const COLOR_TEAMS: ColorTeam[] = [
  {
    id: "red",
    name: "Red Team",
    hex: "#ef4444",
    textHex: "#ffffff",
    tagline: "Offense & Adversary Simulation",
    description:
      "Red teams simulate real-world attackers to test an organization's defenses. They use the same tools and techniques as adversaries to find vulnerabilities before malicious actors do.",
    teams: [
      { name: "Penetration Testing", description: "Authorized simulated attacks on systems, networks, and applications to identify vulnerabilities." },
      { name: "Adversary Simulation", description: "Full-scope attack campaigns mimicking advanced persistent threats (APTs)." },
      { name: "Social Engineering", description: "Testing human vulnerabilities through phishing, vishing, and physical intrusion." },
      { name: "Bug Bounty", description: "Independent researchers finding and responsibly disclosing vulnerabilities for rewards." },
    ],
    tools: [
      { name: "Metasploit", description: "The world's most widely used penetration testing framework.", url: "https://metasploit.com", license: "open-source", tags: ["exploitation", "post-exploitation"] },
      { name: "Cobalt Strike", description: "Advanced adversary simulation and red team operations platform.", url: "https://cobaltstrike.com", license: "commercial", tags: ["C2", "adversary-simulation"] },
      { name: "Burp Suite", description: "Industry-standard web application security testing platform.", url: "https://portswigger.net/burp", license: "freemium", tags: ["web", "proxy", "scanner"] },
      { name: "Nmap", description: "Network discovery and security auditing utility.", url: "https://nmap.org", license: "open-source", tags: ["reconnaissance", "network"] },
      { name: "Mimikatz", description: "Windows credential extraction and manipulation tool.", url: "https://github.com/gentilkiwi/mimikatz", license: "open-source", tags: ["credentials", "windows"] },
      { name: "Hashcat", description: "World's fastest GPU-based password recovery tool.", url: "https://hashcat.net", license: "open-source", tags: ["passwords", "cracking"] },
      { name: "SQLmap", description: "Automated SQL injection detection and exploitation.", url: "https://sqlmap.org", license: "open-source", tags: ["web", "sql-injection"] },
      { name: "Empire", description: "PowerShell and Python post-exploitation framework.", url: "https://github.com/BC-SECURITY/Empire", license: "open-source", tags: ["post-exploitation", "C2"] },
      { name: "Responder", description: "LLMNR/NBT-NS/MDNS poisoner for credential capture.", url: "https://github.com/lgandx/Responder", license: "open-source", tags: ["network", "credentials"] },
      { name: "theHarvester", description: "OSINT tool for gathering emails, subdomains, and hosts.", url: "https://github.com/laramies/theHarvester", license: "open-source", tags: ["osint", "reconnaissance"] },
      { name: "Shodan", description: "Search engine for internet-connected devices.", url: "https://shodan.io", license: "freemium", tags: ["osint", "reconnaissance"] },
      { name: "Aircrack-ng", description: "Wireless network security auditing suite.", url: "https://aircrack-ng.org", license: "open-source", tags: ["wireless", "cracking"] },
    ],
    roles: [
      { title: "Penetration Tester", description: "Performs authorized attacks on systems to find exploitable vulnerabilities.", certifications: ["OSCP", "CEH", "GPEN", "PNPT"] },
      { title: "Red Team Operator", description: "Conducts full-scope adversary simulations against organizations.", certifications: ["CRTO", "CRTE", "OSCP"] },
      { title: "Bug Bounty Hunter", description: "Independent researcher discovering and disclosing vulnerabilities for rewards.", certifications: ["OSCP", "BSCP"] },
      { title: "Application Security Tester", description: "Specializes in web and mobile application penetration testing.", certifications: ["BSCP", "GWEB", "CEH"] },
    ],
  },
  {
    id: "blue",
    name: "Blue Team",
    hex: "#3b82f6",
    textHex: "#ffffff",
    tagline: "Defense, Detection & Response",
    description:
      "Blue teams defend organizations from cyber attacks through continuous monitoring, threat detection, incident response, and digital forensics. They are the guardians of the network.",
    teams: [
      { name: "Security Operations Center (SOC)", description: "24/7 monitoring of alerts, events, and potential incidents." },
      { name: "Incident Response (IR)", description: "Rapid containment and remediation of active security incidents." },
      { name: "Digital Forensics", description: "Collecting, preserving, and analyzing evidence from compromised systems." },
      { name: "Threat Hunting", description: "Proactively searching for hidden threats that evade automated detection." },
      { name: "Detection Engineering", description: "Building and tuning detection rules and alerts to identify adversary behavior." },
    ],
    tools: [
      { name: "Splunk", description: "Industry-leading SIEM platform for log analysis and security monitoring.", url: "https://splunk.com", license: "commercial", tags: ["SIEM", "log-analysis"] },
      { name: "Elastic Security", description: "Open SIEM built on the Elastic Stack with SIEM, endpoint, and cloud capabilities.", url: "https://elastic.co/security", license: "freemium", tags: ["SIEM", "EDR"] },
      { name: "CrowdStrike Falcon", description: "Cloud-native endpoint detection and response (EDR) platform.", url: "https://crowdstrike.com", license: "commercial", tags: ["EDR", "endpoint"] },
      { name: "Suricata", description: "High-performance open-source network intrusion detection system.", url: "https://suricata.io", license: "open-source", tags: ["IDS", "network"] },
      { name: "Zeek", description: "Powerful open-source network analysis framework for security monitoring.", url: "https://zeek.org", license: "open-source", tags: ["network", "traffic-analysis"] },
      { name: "Velociraptor", description: "Open-source DFIR platform for endpoint monitoring and forensics.", url: "https://velociraptor.app", license: "open-source", tags: ["DFIR", "endpoint"] },
      { name: "TheHive", description: "Scalable security incident response platform.", url: "https://thehive-project.org", license: "open-source", tags: ["incident-response", "case-management"] },
      { name: "YARA", description: "Pattern matching tool for malware identification and classification.", url: "https://virustotal.github.io/yara", license: "open-source", tags: ["malware", "detection"] },
      { name: "Sigma", description: "Generic signature format for SIEM systems and log-based detections.", url: "https://github.com/SigmaHQ/sigma", license: "open-source", tags: ["detection", "rules"] },
      { name: "Volatility", description: "Advanced memory forensics framework for incident response.", url: "https://volatilityfoundation.org", license: "open-source", tags: ["forensics", "memory"] },
      { name: "Wazuh", description: "Open-source SIEM and XDR platform for threat detection.", url: "https://wazuh.com", license: "open-source", tags: ["SIEM", "XDR"] },
      { name: "MISP", description: "Open-source threat intelligence platform for sharing IoCs.", url: "https://misp-project.org", license: "open-source", tags: ["threat-intel", "sharing"] },
    ],
    roles: [
      { title: "SOC Analyst (Tier 1-3)", description: "Monitors alerts, triages incidents, and escalates threats based on severity.", certifications: ["CompTIA Security+", "CySA+", "GCIH"] },
      { title: "Incident Responder", description: "Leads containment, eradication, and recovery during active security incidents.", certifications: ["GCIH", "GCFE", "GCFA"] },
      { title: "Digital Forensics Analyst", description: "Collects and analyzes digital evidence from compromised systems.", certifications: ["GCFE", "GCFA", "GCFR", "EnCE"] },
      { title: "Detection Engineer", description: "Builds and tunes detection rules, playbooks, and alerting logic.", certifications: ["GCIA", "Splunk Core Certified"] },
      { title: "Threat Hunter", description: "Proactively seeks out hidden threats using hypothesis-driven investigation.", certifications: ["GCTH", "GCIA"] },
    ],
  },
  {
    id: "yellow",
    name: "Yellow Team",
    hex: "#eab308",
    textHex: "#000000",
    tagline: "Secure Development & Architecture",
    description:
      "Yellow teams build security into software and systems from the ground up. They ensure that applications, infrastructure, and pipelines are designed and coded with security as a first-class requirement.",
    teams: [
      { name: "Application Security (AppSec)", description: "Ensuring software is designed and built securely." },
      { name: "DevSecOps", description: "Integrating security testing and controls into CI/CD pipelines." },
      { name: "Security Architecture", description: "Designing secure systems, networks, and cloud infrastructure." },
      { name: "Secure Code Review", description: "Manual and automated review of source code for security vulnerabilities." },
    ],
    tools: [
      { name: "SonarQube", description: "Continuous code quality and security analysis for development teams.", url: "https://sonarqube.org", license: "freemium", tags: ["SAST", "code-quality"] },
      { name: "Semgrep", description: "Fast, lightweight static analysis tool for finding bugs and security issues.", url: "https://semgrep.dev", license: "freemium", tags: ["SAST", "code-analysis"] },
      { name: "Snyk", description: "Developer-first security platform for code, dependencies, containers, and IaC.", url: "https://snyk.io", license: "freemium", tags: ["SCA", "dependencies"] },
      { name: "Checkmarx", description: "Enterprise SAST platform for comprehensive code security analysis.", url: "https://checkmarx.com", license: "commercial", tags: ["SAST", "enterprise"] },
      { name: "OWASP ZAP", description: "Free and open-source dynamic application security testing proxy.", url: "https://zaproxy.org", license: "open-source", tags: ["DAST", "web"] },
      { name: "Trivy", description: "Comprehensive vulnerability scanner for containers and infrastructure as code.", url: "https://trivy.dev", license: "open-source", tags: ["containers", "IaC"] },
      { name: "Checkov", description: "Static analysis tool for infrastructure as code security misconfigurations.", url: "https://checkov.io", license: "open-source", tags: ["IaC", "terraform"] },
      { name: "GitHub Advanced Security", description: "Integrated security features including CodeQL, secret scanning, and dependency review.", url: "https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security", license: "commercial", tags: ["SAST", "secrets", "SCA"] },
      { name: "Dependabot", description: "Automated dependency updates and vulnerability alerts for GitHub repositories.", url: "https://github.com/dependabot", license: "open-source", tags: ["SCA", "dependencies"] },
    ],
    roles: [
      { title: "Application Security Engineer", description: "Embeds security into the software development lifecycle and reviews code for vulnerabilities.", certifications: ["CSSLP", "GWEB", "CEH"] },
      { title: "DevSecOps Engineer", description: "Automates security testing in CI/CD pipelines and manages security tooling.", certifications: ["AWS Security Specialty", "GCSA"] },
      { title: "Security Architect", description: "Designs secure systems and ensures architecture aligns with security requirements.", certifications: ["CISSP", "SABSA", "TOGAF"] },
    ],
  },
  {
    id: "purple",
    name: "Purple Team",
    hex: "#a855f7",
    textHex: "#ffffff",
    tagline: "Red + Blue Collaboration & Validation",
    description:
      "Purple teams bridge the gap between Red and Blue teams. By combining offensive and defensive knowledge, they run collaborative exercises that improve detection capabilities and validate security controls in real time.",
    teams: [
      { name: "Purple Team Exercises", description: "Structured exercises where Red and Blue work together in real time to test and improve detections." },
      { name: "Threat Intelligence Integration", description: "Applying threat intel to inform attack simulations and defensive tuning." },
      { name: "Control Validation", description: "Systematically testing whether security controls work as expected against known TTPs." },
    ],
    tools: [
      { name: "MITRE Caldera", description: "Open-source adversary emulation platform built on the ATT&CK framework.", url: "https://caldera.mitre.org", license: "open-source", tags: ["adversary-emulation", "ATT&CK"] },
      { name: "Atomic Red Team", description: "Library of small, focused tests mapped to MITRE ATT&CK techniques.", url: "https://atomicredteam.io", license: "open-source", tags: ["testing", "ATT&CK"] },
      { name: "VECTR", description: "Free platform for tracking and measuring purple team exercise effectiveness.", url: "https://vectr.io", license: "open-source", tags: ["tracking", "exercises"] },
      { name: "SCYTHE", description: "Enterprise adversary simulation platform for purple team campaigns.", url: "https://scythe.io", license: "commercial", tags: ["adversary-simulation", "campaigns"] },
      { name: "PlexTrac", description: "Purple team reporting and collaboration platform.", url: "https://plextrac.com", license: "commercial", tags: ["reporting", "collaboration"] },
      { name: "Cymulate", description: "Continuous security validation and breach & attack simulation platform.", url: "https://cymulate.com", license: "commercial", tags: ["BAS", "validation"] },
    ],
    roles: [
      { title: "Purple Team Lead", description: "Coordinates joint Red/Blue exercises and translates findings into improved detections.", certifications: ["CRTO", "GCIH", "GCTI"] },
      { title: "Threat Intelligence Analyst", description: "Researches adversary TTPs and applies threat intel to improve detection and prevention.", certifications: ["GCTI", "CTIA"] },
    ],
  },
  {
    id: "green",
    name: "Green Team",
    hex: "#22c55e",
    textHex: "#000000",
    tagline: "Blue + Yellow — Secure Ops & Automation",
    description:
      "Green teams combine defensive operations with software engineering. They build detection capabilities into code, automate security workflows, and improve logging and observability across the stack.",
    teams: [
      { name: "Security Automation", description: "Building automated workflows, SOAR playbooks, and scripted responses to security events." },
      { name: "Detection-as-Code", description: "Writing and managing detection rules as versioned code in repositories." },
      { name: "Security Observability", description: "Improving logging, tracing, and metrics to give defenders full visibility." },
    ],
    tools: [
      { name: "Cortex XSOAR", description: "Security orchestration, automation, and response (SOAR) platform.", url: "https://paloaltonetworks.com/cortex/xsoar", license: "commercial", tags: ["SOAR", "automation"] },
      { name: "Shuffle", description: "Open-source SOAR platform for security workflow automation.", url: "https://shuffler.io", license: "open-source", tags: ["SOAR", "automation"] },
      { name: "OpenCTI", description: "Open-source cyber threat intelligence platform with automation capabilities.", url: "https://opencti.io", license: "open-source", tags: ["threat-intel", "automation"] },
      { name: "Detection-as-Code (Sigma)", description: "Managing detection rules as code using the Sigma standard.", url: "https://github.com/SigmaHQ/sigma", license: "open-source", tags: ["detection", "rules-as-code"] },
      { name: "Tines", description: "No-code security automation platform for building incident response workflows.", url: "https://tines.com", license: "commercial", tags: ["SOAR", "no-code"] },
      { name: "Datadog Security", description: "Cloud-scale monitoring with integrated security signals.", url: "https://datadoghq.com/security", license: "commercial", tags: ["observability", "cloud"] },
    ],
    roles: [
      { title: "Security Engineer", description: "Builds security tooling, automation, and integrations across the security stack.", certifications: ["GCSA", "AWS Security Specialty"] },
      { title: "SOAR Engineer", description: "Designs and maintains security automation playbooks and orchestration workflows.", certifications: ["Cortex XSOAR Certification"] },
    ],
  },
  {
    id: "orange",
    name: "Orange Team",
    hex: "#f97316",
    textHex: "#ffffff",
    tagline: "Red + Yellow — Security Culture & Training",
    description:
      "Orange teams bridge offensive security knowledge and development teams. They train developers to think like attackers, build security awareness programs, and embed offensive knowledge into the development culture.",
    teams: [
      { name: "Developer Security Training", description: "Teaching developers attack techniques so they can write more secure code." },
      { name: "Security Awareness", description: "Building organization-wide security culture through education and phishing simulations." },
      { name: "Capture the Flag (CTF)", description: "Running challenges and competitions that teach offensive and defensive skills." },
    ],
    tools: [
      { name: "OWASP WebGoat", description: "Deliberately insecure application for teaching web security vulnerabilities.", url: "https://owasp.org/www-project-webgoat", license: "open-source", tags: ["training", "web"] },
      { name: "OWASP Juice Shop", description: "Modern insecure web application for security training and CTFs.", url: "https://owasp.org/www-project-juice-shop", license: "open-source", tags: ["training", "CTF"] },
      { name: "HackTheBox", description: "Online platform for practicing penetration testing skills in realistic labs.", url: "https://hackthebox.com", license: "freemium", tags: ["training", "labs"] },
      { name: "TryHackMe", description: "Beginner-friendly cybersecurity training platform with guided paths.", url: "https://tryhackme.com", license: "freemium", tags: ["training", "beginner"] },
      { name: "PentesterLab", description: "Practical web security training with real vulnerabilities to exploit.", url: "https://pentesterlab.com", license: "freemium", tags: ["training", "web"] },
      { name: "KnowBe4", description: "Security awareness training and simulated phishing platform.", url: "https://knowbe4.com", license: "commercial", tags: ["awareness", "phishing"] },
      { name: "Proofpoint Security Awareness", description: "Enterprise security awareness and anti-phishing training.", url: "https://proofpoint.com", license: "commercial", tags: ["awareness", "enterprise"] },
    ],
    roles: [
      { title: "Security Awareness Manager", description: "Runs organization-wide security education programs and simulated phishing campaigns.", certifications: ["SSAP", "CompTIA Security+"] },
      { title: "Security Trainer/Educator", description: "Teaches security concepts and skills to developers and non-technical staff.", certifications: ["CEH", "OSCP"] },
    ],
  },
  {
    id: "white",
    name: "White Team",
    hex: "#f8fafc",
    textHex: "#0f172a",
    tagline: "Governance, Risk & Compliance",
    description:
      "White teams govern all security activities. They set policy, manage risk, ensure compliance, and oversee exercises. They are the authority that defines the rules of engagement for all other teams.",
    teams: [
      { name: "Governance, Risk & Compliance (GRC)", description: "Managing risk frameworks, policies, and regulatory compliance." },
      { name: "Security Policy & Standards", description: "Writing and enforcing security policies, standards, and procedures." },
      { name: "Audit & Assessment", description: "Internal and external audits against frameworks like SOC 2, ISO 27001, and NIST CSF." },
      { name: "Exercise Management", description: "Planning, overseeing, and adjudicating Red Team/Blue Team exercises." },
    ],
    tools: [
      { name: "ServiceNow GRC", description: "Enterprise governance, risk, and compliance management platform.", url: "https://servicenow.com/products/governance-risk-and-compliance.html", license: "commercial", tags: ["GRC", "enterprise"] },
      { name: "Archer", description: "RSA's enterprise GRC platform for risk management and compliance.", url: "https://archerirm.com", license: "commercial", tags: ["GRC", "risk"] },
      { name: "Vanta", description: "Automated security compliance platform for SOC 2, ISO 27001, HIPAA.", url: "https://vanta.com", license: "commercial", tags: ["compliance", "automation"] },
      { name: "Drata", description: "Continuous compliance automation platform for modern security teams.", url: "https://drata.com", license: "commercial", tags: ["compliance", "automation"] },
      { name: "Qualys", description: "Cloud-based vulnerability management, compliance, and security platform.", url: "https://qualys.com", license: "commercial", tags: ["vulnerability-management", "compliance"] },
      { name: "Tenable.io", description: "Cloud vulnerability management with continuous assessment and risk scoring.", url: "https://tenable.com", license: "commercial", tags: ["vulnerability-management", "risk"] },
    ],
    roles: [
      { title: "CISO (Chief Information Security Officer)", description: "Leads the organization's information security strategy, risk management, and compliance programs.", certifications: ["CISSP", "CISM", "CCISO"] },
      { title: "GRC Analyst", description: "Assesses risk, manages compliance programs, and coordinates audits.", certifications: ["CRISC", "CISM", "CompTIA Security+"] },
      { title: "Security Compliance Manager", description: "Ensures the organization meets regulatory and framework requirements.", certifications: ["CISA", "CRISC", "ISO 27001 Lead Implementer"] },
    ],
  },
];

export function getTeamById(id: string): ColorTeam | undefined {
  return COLOR_TEAMS.find((t) => t.id === id);
}
