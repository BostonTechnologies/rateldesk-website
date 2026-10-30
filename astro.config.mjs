import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
const origin = process.env.SITE_URL || 'https://rateldesk.hello43031.chatgpt.site';
const item = (label, path) => ({ label, link: path ? `/docs/${path}/` : '/docs/' });
export default defineConfig({
 site: origin, output: 'static', server: { allowedHosts: ['terminal.local'] }, trailingSlash: 'always', devToolbar: { enabled: false },
 integrations: [starlight({
  title: 'RatelDesk', disable404Route: true,
  description: 'Practical documentation for RatelDesk, the self-hosted helpdesk with email, AI and NetRatel automation.',
  favicon: '/brand/rateldesk-mark-32.png', defaultLocale: 'root', locales: { root: { label: 'English', lang: 'en' } },
  editLink: { baseUrl: 'https://github.com/BostonTechnologies/rateldesk-website/edit/main/' }, lastUpdated: false, pagination: true,
  tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 }, customCss: ['./src/styles/docs.css'],
  components: { Header: './src/components/DocsHeader.astro', Footer: './src/components/DocsFooter.astro', ThemeSelect: './src/components/Empty.astro', ThemeProvider: './src/components/DarkTheme.astro' },
  head: [
   { tag: 'meta', attrs: { name: 'theme-color', content: '#080c14' } },
   { tag: 'meta', attrs: { property: 'og:image', content: `${origin}/brand/rateldesk-social-preview.webp` } },
   { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' } },
  ],
  sidebar: [
   { label: 'Start here', items: [item('Documentation', ''),item('Quickstart','getting-started/quickstart'),item('Requirements','getting-started/requirements')] },
   { label: 'Deployment', collapsed: false, items: [item('Choose a deployment','deployment/overview'),item('Docker Compose','deployment/docker-compose'),item('Public HTTPS','deployment/public-https'),item('Reverse proxy','deployment/reverse-proxy'),item('External PostgreSQL','deployment/external-postgresql'),item('Upgrades','deployment/upgrades'),item('Backup & restore','deployment/backup-and-restore')] },
   { label: 'Identity & access', collapsed: true, items: [item('Choose a sign-in method','identity/overview'),item('Local accounts','identity/local'),item('OpenID Connect','identity/oidc'),item('Hybrid sign-in','identity/hybrid'),item('Users & roles','identity/users-and-roles')] },
   { label: 'Run the service desk', collapsed: true, items: [item('Incidents','guides/incidents'),item('Service requests','guides/service-requests'),item('Tasks & worklogs','guides/tasks-and-worklogs'),item('Organizations & access','guides/organizations-and-access'),item('Changes','guides/changes'),item('Assets','guides/assets'),item('Service levels','guides/service-levels'),item('Notifications','guides/notifications')] },
   { label: 'Email support', collapsed: true, items: [item('Choose your mail setup','email/overview'),item('Microsoft 365','email/microsoft-365'),item('IMAP & POP3','email/imap-and-pop3'),item('Outbound mail','email/outbound-mail'),item('Routing & rules','email/routing-and-rules'),item('Mail troubleshooting','email/troubleshooting')] },
   { label: 'Self-service automation', collapsed: true, items: [item('Build request forms','automation/self-service-forms'),item('Pair with NetRatel','automation/netratel-pairing'),item('Connect forms to jobs','automation/job-bindings'),item('Follow a run','automation/run-and-troubleshoot')] },
   { label: 'Integrations & AI', collapsed: true, items: [item('Choose an integration','integrations/overview'),item('Integration credentials','integrations/credentials'),item('HTTP MCP','integrations/http-mcp'),item('stdio MCP','integrations/stdio'),item('Operator policies','integrations/operator-policies'),item('Netclaw ticket chat','integrations/netclaw'),item('Microsoft Teams + Netclaw','integrations/microsoft-teams'),item('NetRatel incidents','integrations/netratel')] },
   { label: 'Reference & support', collapsed: true, items: [item('Architecture','reference/architecture'),item('Command-line interface','reference/cli'),item('Configuration','reference/configuration'),item('Security model','reference/security'),item('Troubleshooting','reference/troubleshooting')] },
  ],
 })],
});
