import { Database, ShieldCheck } from 'lucide-react';
import { dataSource } from '@/services/dataService';

export function Configurações() {
	const apiConnected = dataSource === 'API conectada';

	return (
		<section className="page-shell">
			<header className="page-heading"><div><p className="eyebrow">PREFERÊNCIAS</p><h1>Configurações</h1><p className="text-muted-foreground">Estado da conexão e acesso ao painel.</p></div></header>
			<div className="settings-section">
				<div className="settings-icon"><Database size={19} /></div>
				<div className="settings-copy"><h2>Fonte de dados</h2><p>Os módulos usam um serviço compartilhado, pronto para substituir o mock por endpoints HTTP.</p></div>
				<span className={`connection-status ${apiConnected ? 'connected' : ''}`}><span />{dataSource}</span>
			</div>
			<div className="settings-section">
				<div className="settings-icon settings-icon-green"><ShieldCheck size={19} /></div>
				<div className="settings-copy"><h2>Autenticação</h2><p>O acesso atual é demonstrativo e armazenado apenas nesta sessão do navegador.</p></div>
				<span className="settings-note">Não usar em produção</span>
			</div>
		</section>
	);
}

export default Configurações;
