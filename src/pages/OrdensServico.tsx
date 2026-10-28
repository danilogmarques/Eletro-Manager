import { useMemo, useState, type FormEvent } from 'react';
import { ClipboardList, Plus, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAsyncData } from '@/hooks/useAsyncData';
import { dataService, dataSource } from '@/services/dataService';
import type { WorkOrder } from '@/types/types';
import type { WorkOrderInput } from '@/services/dataService';

type OrderForm = {
  customerId: string;
  serviceId: string;
  description: string;
  address: string;
  date: string;
  time: string;
};

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatScheduledAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export function OrdensServico() {
  const { data: customers, loading: loadingCustomers, error: customersError } = useAsyncData(dataService.listCustomers, []);
  const { data: services, loading: loadingServices, error: servicesError } = useAsyncData(dataService.listServices, []);
  const { data: loadedOrders, loading: loadingOrders, error: ordersError } = useAsyncData(dataService.listWorkOrders, []);
  const [orders, setOrders] = useState<WorkOrder[] | null>(null);
  const visibleOrders = orders ?? loadedOrders;
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [form, setForm] = useState<OrderForm>({
    customerId: '',
    serviceId: '',
    description: '',
    address: '',
    date: localDateValue(new Date()),
    time: '09:00',
  });

  const filteredOrders = useMemo(
    () =>
      visibleOrders.filter((order) =>
        `${order.id} ${order.customer} ${order.service} ${order.address}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      ),
    [visibleOrders, search],
  );

  function updateForm(field: keyof OrderForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError('');
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setSavedMessage('');

    const customer = customers.find((item) => item.id === form.customerId);
    const service = services.find((item) => item.id === form.serviceId);
    if (!customer || !service) {
      setFormError('Selecione um cliente e um serviço disponíveis.');
      return;
    }

    const scheduledDate = new Date(`${form.date}T${form.time}:00`);
    if (Number.isNaN(scheduledDate.getTime())) {
      setFormError('Informe uma data e horário válidos.');
      return;
    }

    const newOrder: WorkOrderInput = {
      customerId: customer.id,
      serviceId: service.id,
      description: form.description.trim(),
      address: form.address.trim(),
      scheduledAt: scheduledDate.toISOString(),
    };
    try {
      const order = await dataService.createWorkOrder(newOrder);
      setOrders((current) => [order, ...(current ?? loadedOrders)]);
      setForm({
        customerId: '',
        serviceId: '',
        description: '',
        address: '',
        date: localDateValue(new Date()),
        time: '09:00',
      });
      setFormOpen(false);
      setSavedMessage(`${order.id} criada com sucesso.`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Não foi possível salvar a ordem de serviço.');
      return;
    }
  }

  return (
    <section className="page-shell">
      <header className="page-heading work-orders-heading">
        <div>
          <p className="eyebrow">GESTÃO DE ATENDIMENTOS</p>
          <h1>Ordens de serviço</h1>
          <p className="text-muted-foreground">Crie e acompanhe os atendimentos da equipe de campo.</p>
        </div>
        <Button type="button" className="create-order-button" onClick={() => {
          setFormOpen((open) => !open);
          setFormError('');
          setSavedMessage('');
        }}>
          {formOpen ? <X size={16} /> : <Plus size={16} />}
          {formOpen ? 'Fechar formulário' : 'Nova ordem de serviço'}
        </Button>
      </header>

      <section className="budget-summary work-order-summary">
        <article className="summary-item">
          <span className="summary-icon"><ClipboardList size={19} /></span>
          <div><p>Total de ordens</p><strong>{visibleOrders.length}</strong></div>
        </article>
        <article className="summary-item">
          <span className="summary-icon summary-icon-amber">◷</span>
          <div><p>Agendadas</p><strong>{visibleOrders.filter((order) => order.status === 'Agendada').length}</strong></div>
        </article>
        <article className="summary-item">
          <span className="summary-icon summary-icon-green">✓</span>
          <div><p>Concluídas</p><strong>{visibleOrders.filter((order) => order.status === 'Concluída').length}</strong></div>
        </article>
      </section>

      {ordersError && <p className="page-error" role="alert">{ordersError}</p>}
      {savedMessage && <p className="order-success" role="status">{savedMessage}</p>}

      {formOpen && (
        <section className="order-form-card" aria-labelledby="order-form-title">
          <div className="order-form-heading">
            <div>
              <p className="eyebrow">NOVO ATENDIMENTO</p>
              <h2 id="order-form-title">Cadastrar ordem de serviço</h2>
              <p>Preencha os dados para encaminhar o serviço à equipe.</p>
            </div>
          </div>
          {(customersError || servicesError) && (
            <p className="page-error" role="alert">
              {customersError || servicesError} Não foi possível carregar os dados necessários para criar a ordem.
            </p>
          )}
          <form className="order-form" onSubmit={handleCreate}>
            <div className="order-form-grid">
              <div className="order-field">
                <label htmlFor="order-customer">Cliente</label>
                <select
                  id="order-customer"
                  required
                  value={form.customerId}
                  onChange={(event) => updateForm('customerId', event.target.value)}
                  disabled={loadingCustomers || Boolean(customersError)}
                >
                  <option value="">Selecione um cliente</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div className="order-field">
                <label htmlFor="order-service">Serviço</label>
                <select
                  id="order-service"
                  required
                  value={form.serviceId}
                  onChange={(event) => updateForm('serviceId', event.target.value)}
                  disabled={loadingServices || Boolean(servicesError)}
                >
                  <option value="">Selecione um serviço</option>
                  {services.filter((service) => service.status === 'Available').map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div className="order-field order-field-wide">
                <label htmlFor="order-address">Endereço do atendimento</label>
                <Input
                  id="order-address"
                  required
                  value={form.address}
                  onChange={(event) => updateForm('address', event.target.value)}
                  placeholder="Rua, número, bairro e complemento"
                  autoComplete="street-address"
                />
              </div>
              <div className="order-field">
                <label htmlFor="order-date">Data agendada</label>
                <Input
                  id="order-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(event) => updateForm('date', event.target.value)}
                />
              </div>
              <div className="order-field">
                <label htmlFor="order-time">Horário</label>
                <Input
                  id="order-time"
                  type="time"
                  required
                  value={form.time}
                  onChange={(event) => updateForm('time', event.target.value)}
                />
              </div>
              <div className="order-field order-field-wide">
                <label htmlFor="order-description">Descrição do serviço</label>
                <textarea
                  id="order-description"
                  required
                  minLength={5}
                  rows={4}
                  value={form.description}
                  onChange={(event) => updateForm('description', event.target.value)}
                  placeholder="Descreva o trabalho que deverá ser realizado."
                />
              </div>
            </div>
            {formError && <p className="page-error" role="alert">{formError}</p>}
            <div className="order-form-actions">
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={loadingCustomers || loadingServices || Boolean(customersError || servicesError)}>
                <Plus size={15} /> Criar ordem
              </Button>
            </div>
          </form>
        </section>
      )}

      <div className="table-toolbar work-order-toolbar">
        <div className="search-field">
          <Search size={17} />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar código, cliente ou serviço" aria-label="Buscar ordens de serviço" />
        </div>
        <span className="result-count">{filteredOrders.length} ordens</span>
      </div>

      <div className="data-table-wrap">
        <table className="work-orders-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Agendamento</th>
              <th>Endereço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingOrders ? (
              <tr><td colSpan={6} className="work-orders-empty">Carregando ordens de serviço...</td></tr>
            ) : filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.service}</td>
                <td>{formatScheduledAt(order.scheduledAt)}</td>
                <td>{order.address}</td>
                <td><Badge variant="outline" className="status-pending">{order.status}</Badge></td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="work-orders-empty">
                  {search ? 'Nenhuma ordem encontrada para esta busca.' : 'Nenhuma ordem cadastrada. Use “Nova ordem de serviço” para criar a primeira.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="work-order-note">
        {dataSource === 'API conectada'
          ? 'As ordens de serviço são salvas no banco de dados.'
          : 'As ordens desta versão demonstrativa são salvas neste navegador.'}
      </p>
    </section>
  );
}
