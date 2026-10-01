import { useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LoginProps = { onLogin: () => void };

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('eletricista@lumina.com');
  const [password, setPassword] = useState('eletrica2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim() !== 'eletricista@lumina.com' || password !== 'eletrica2026') {
      setError('Confira o e-mail e a senha de demonstração.');
      return;
    }
    localStorage.setItem('eletricista-session', 'active');
    onLogin();
  }

  return (
    <main className="login-screen">
      <section className="login-brand-panel" aria-label="Lumina Gestão">
        <div className="brand-lockup"><span className="brand-mark"><Zap size={20} fill="currentColor" /></span><span>LUMINA<span className="brand-light"> / GESTÃO</span></span></div>
        <div className="brand-message">
          <p className="eyebrow">CONTROLE DE PONTA A PONTA</p>
          <h1>Seu trabalho,<br />em boa corrente.</h1>
          <p>Clientes, serviços e propostas reunidos para manter cada projeto em movimento.</p>
        </div>
        <div className="brand-footer"><span>GESTÃO ELÉTRICA</span><span>01 — 04</span></div>
      </section>
      <section className="login-form-panel">
        <div className="login-form-wrap">
          <p className="eyebrow">ÁREA DO PROFISSIONAL</p>
          <h2>Bem-vindo de volta</h2>
          <p className="login-intro">Entre na sua conta para acessar o painel.</p>
          <form onSubmit={submit} className="login-form">
            <label htmlFor="email">E-mail</label>
            <Input id="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <div className="password-label"><label htmlFor="password">Senha</label></div>
            <div className="password-control">
              <Input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <Button type="submit" className="login-submit">Entrar <ArrowRight size={17} /></Button>
          </form>
          <div className="demo-credentials"><span className="demo-dot" /><div><strong>Acesso de demonstração</strong><span>eletricista@lumina.com · eletrica2026</span></div></div>
          <p className="login-disclaimer">Autenticação demonstrativa. Conecte um provedor de identidade antes de usar em produção.</p>
        </div>
        <span className="login-copyright">LUMINA GESTÃO · 2026</span>
      </section>
    </main>
  );
}