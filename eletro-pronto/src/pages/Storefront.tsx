import { useMemo, useState, type FormEvent } from "react"
import {
  ArrowDownWideNarrow,
  ArrowRight,
  Cable,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Globe,
  Heart,
  Lightbulb,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  PlugZap,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"

type Category = "Todos" | "Iluminação" | "Fios e cabos" | "Tomadas" | "Ferramentas"
type Product = {
  id: number
  name: string
  category: Exclude<Category, "Todos">
  detail: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  imageAlt: string
  badge?: string
}
type CartItem = { product: Product; quantity: number }

const products: Product[] = [
  {
    id: 1,
    name: "Lâmpada LED Bulbo 12W",
    category: "Iluminação",
    detail: "Luz branca · Bivolt · Avant",
    price: 12.9,
    oldPrice: 18.9,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Luminária moderna acesa em um ambiente aconchegante",
    badge: "Mais vendido",
  },
  {
    id: 2,
    name: "Cabo Flexível 2,5mm² · 10m",
    category: "Fios e cabos",
    detail: "750V · Antichama · Sil",
    price: 34.5,
    rating: 4.8,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Profissional trabalhando em uma instalação elétrica",
    badge: "Escolha do eletricista",
  },
  {
    id: 3,
    name: "Kit Tomada 10A + Interruptor",
    category: "Tomadas",
    detail: "Linha branca · 4×2 · Tramontina",
    price: 28.9,
    rating: 4.7,
    reviews: 54,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Detalhe de iluminação e instalação em uma parede",
  },
  {
    id: 4,
    name: "Alicate Universal 8”",
    category: "Ferramentas",
    detail: "Isolação 1.000V · Vonder",
    price: 49.9,
    oldPrice: 59.9,
    rating: 4.9,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Ferramentas manuais organizadas para um projeto",
    badge: "Oferta",
  },
  {
    id: 5,
    name: "Fita Isolante Antichama 20m",
    category: "Fios e cabos",
    detail: "Uso profissional · 3M",
    price: 9.9,
    rating: 4.8,
    reviews: 71,
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Materiais e ferramentas para manutenção elétrica",
  },
  {
    id: 6,
    name: "Plafon LED Sobrepor 18W",
    category: "Iluminação",
    detail: "Redondo · Luz neutra · Blumenau",
    price: 42.9,
    rating: 4.9,
    reviews: 39,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Luminária de teto iluminando uma sala moderna",
  },
  {
    id: 7,
    name: "Tomada USB Dupla 20A",
    category: "Tomadas",
    detail: "Carregamento rápido · 4×2 · WEG",
    price: 69.9,
    rating: 4.6,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Acabamento moderno para instalações residenciais",
  },
  {
    id: 8,
    name: "Chave Teste Digital",
    category: "Ferramentas",
    detail: "Display LCD · Detecção de tensão",
    price: 24.9,
    rating: 4.8,
    reviews: 97,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=85",
    imageAlt: "Ferramentas para serviços de manutenção e instalação",
  },
]

const categories: { name: Category; icon: LucideIcon; description: string }[] = [
  { name: "Iluminação", icon: Lightbulb, description: "Lâmpadas, plafons e muito mais" },
  { name: "Fios e cabos", icon: Cable, description: "Tudo para sua instalação" },
  { name: "Tomadas", icon: PlugZap, description: "Acabamento que faz diferença" },
  { name: "Ferramentas", icon: Wrench, description: "Trabalho bem feito começa aqui" },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price)

function Storefront() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterMessage, setNewsletterMessage] = useState("")
  const [checkoutMessage, setCheckoutMessage] = useState("")

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR")
    const visibleProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.category} ${product.detail}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })

    if (sort === "price-asc") return [...visibleProducts].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") return [...visibleProducts].sort((a, b) => b.price - a.price)
    if (sort === "rating") return [...visibleProducts].sort((a, b) => b.rating - a.rating)
    return visibleProducts
  }, [search, selectedCategory, sort])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shippingRemaining = Math.max(0, 199 - cartTotal)

  const goToProducts = (category: Category = "Todos") => {
    setSelectedCategory(category)
    setMenuOpen(false)
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.product.id === product.id)
      if (existing) {
        return currentCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...currentCart, { product, quantity: 1 }]
    })
    setCheckoutMessage("")
    setCartOpen(true)
  }

  const updateQuantity = (productId: number, amount: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterMessage(
      "Cadastro demonstrativo. Conecte um serviço de e-mail para ativar o envio de novidades.",
    )
    setNewsletterEmail("")
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#192820]">
      <div className="bg-[#19352a] px-4 py-2 text-center text-[11px] font-medium tracking-[0.08em] text-white sm:text-xs">
        <span className="inline-flex items-center gap-2">
          <Truck size={14} strokeWidth={1.8} />
          FRETE GRÁTIS A PARTIR DE R$ 199 · ENTREGA PARA TODO O BRASIL
        </span>
      </div>

      <header className="border-b border-[#eae8e2] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-[1320px] items-center gap-5 px-5 py-4 lg:px-8">
          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="rounded-full p-2 text-[#19352a] hover:bg-[#f0eee7] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <button
            className="flex shrink-0 items-center gap-2.5 text-left"
            onClick={() => {
              setSelectedCategory("Todos")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            aria-label="Voltar ao início"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f05a] text-[#19352a]">
              <Zap size={23} fill="currentColor" strokeWidth={2.2} />
            </span>
            <span className="leading-none">
              <span className="block text-[16px] font-extrabold tracking-[-0.06em] text-[#19352a]">
                Eletro Pronto<span className="text-[#a1aa3a]">.</span>
              </span>
              <span className="mt-1 block text-[8px] font-semibold tracking-[0.02em] text-[#758077]">
                Pronto para melhor atendê-lo
              </span>
            </span>
          </button>

          <form
            className="mx-auto hidden w-full max-w-[520px] items-center rounded-full border border-[#e5e3dc] bg-white px-4 py-2.5 transition focus-within:border-[#9ba63c] md:flex"
            onSubmit={(event) => {
              event.preventDefault()
              document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
            }}
            role="search"
          >
            <Search size={18} className="shrink-0 text-[#899188]" />
            <input
              aria-label="Buscar produtos"
              className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-[#a3aaa4]"
              placeholder="O que você está procurando?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              aria-label="Buscar"
              className="shrink-0 text-xs font-semibold text-[#506151] hover:text-[#19352a]"
              type="submit"
            >
              Buscar
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0eee7] text-[#52614e]">
                <Clock3 size={17} />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] text-[#81877f]">Atendimento</span>
                <span className="block text-xs font-semibold">Seg a sex, 8h–18h</span>
              </span>
            </div>
            <button
              aria-label={`Abrir carrinho, ${cartCount} itens`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e3dc] bg-white text-[#19352a] transition hover:border-[#19352a]"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#e5f05a] px-1 text-[10px] font-bold text-[#19352a]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <form
          className="mx-5 mb-3 flex items-center rounded-full border border-[#e5e3dc] bg-white px-4 py-2.5 md:hidden"
          onSubmit={(event) => {
            event.preventDefault()
            document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
          }}
          role="search"
        >
          <Search size={17} className="shrink-0 text-[#899188]" />
          <input
            aria-label="Buscar produtos"
            className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-[#a3aaa4]"
            placeholder="O que você está procurando?"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button aria-label="Limpar busca" onClick={() => setSearch("")} type="button">
              <X size={16} className="text-[#899188]" />
            </button>
          )}
        </form>

        <nav
          aria-label="Navegação principal"
          className={`${menuOpen ? "flex" : "hidden"} flex-col gap-1 border-t border-[#eae8e2] px-5 py-3 md:flex md:flex-row md:items-center md:justify-center md:gap-10 md:py-0`}
        >
          {(["Todos", "Iluminação", "Fios e cabos", "Tomadas", "Ferramentas"] as Category[]).map(
            (category) => (
              <button
                className={`py-2 text-left text-sm transition hover:text-[#78822d] md:py-3.5 ${
                  selectedCategory === category
                    ? "font-semibold text-[#19352a]"
                    : "font-medium text-[#6e776e]"
                }`}
                key={category}
                onClick={() => goToProducts(category)}
              >
                {category === "Todos" ? "Ver tudo" : category}
              </button>
            ),
          )}
          <button
            className="py-2 text-left text-sm font-medium text-[#6e776e] hover:text-[#78822d] md:py-3.5"
            onClick={() => {
              setMenuOpen(false)
              document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Nossa história
          </button>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-[1320px] px-5 pt-6 sm:pt-8 lg:px-8">
          <div className="hero-panel relative isolate overflow-hidden rounded-[24px] bg-[#e8eddb]">
            <div className="absolute inset-0 -z-10">
              <img
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-35 sm:object-[center_54%]"
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#e8eddb] via-[#e8eddb]/95 to-[#e8eddb]/20" />
            </div>
            <div className="relative max-w-[680px] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-[76px]">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cbd2b9] bg-white/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#4d6547] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9aa63c]" />
                Para quem faz acontecer
              </span>
              <h1 className="max-w-[610px] text-[42px] font-semibold leading-[1.02] tracking-[-0.055em] text-[#19352a] sm:text-[58px] lg:text-[68px]">
                Seu próximo projeto começa <span className="font-serif italic">aqui.</span>
              </h1>
              <p className="mt-5 max-w-[400px] text-sm leading-6 text-[#506151] sm:text-base sm:leading-7">
                Material elétrico de qualidade, preço justo e tudo o que você precisa para ligar
                suas ideias.
              </p>
              <button
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#19352a] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#294d3d]"
                onClick={() => goToProducts()}
              >
                Encontrar meus materiais <ArrowRight size={17} />
              </button>
              <div className="mt-8 flex items-center gap-2 text-xs font-medium text-[#536351]">
                <span className="flex -space-x-2">
                  {["J", "M", "R"].map((initial, index) => (
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#e8eddb] text-[10px] font-bold text-white ${
                        index === 0 ? "bg-[#7b8a63]" : index === 1 ? "bg-[#ad8065]" : "bg-[#4e6958]"
                      }`}
                      key={initial}
                    >
                      {initial}
                    </span>
                  ))}
                </span>
                <span>Mais de 2.400 profissionais compram com a gente</span>
              </div>
            </div>
            <div className="absolute bottom-5 right-6 hidden w-[205px] rotate-3 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_50px_rgba(25,53,42,0.12)] backdrop-blur-sm sm:block lg:bottom-8 lg:right-10">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f05a] text-[#19352a]">
                  <PackageCheck size={18} />
                </span>
                <span className="rounded-full bg-[#edf1e4] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#60744c]">
                  Sem complicação
                </span>
              </div>
              <p className="mt-3 text-sm font-bold text-[#19352a]">Chega rapidinho.</p>
              <p className="mt-1 text-xs leading-5 text-[#70796f]">
                Seu material pronto para o próximo serviço.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Benefícios"
          className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-5 px-5 py-8 sm:grid-cols-4 sm:py-10 lg:px-8"
        >
          {[
            { icon: Truck, title: "Frete grátis", text: "em pedidos acima de R$ 199" },
            { icon: ShieldCheck, title: "Compra segura", text: "seus dados protegidos" },
            { icon: PackageCheck, title: "Envio rápido", text: "pedido enviado em até 24h" },
            { icon: Heart, title: "Feito pra você", text: "suporte de quem entende" },
          ].map(({ icon: Icon, title, text }) => (
            <div className="flex items-center gap-3 sm:justify-center" key={title}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0f1e9] text-[#536a4e]">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span>
                <span className="block text-xs font-bold text-[#263c2c] sm:text-sm">{title}</span>
                <span className="mt-0.5 block text-[10px] text-[#8a9088] sm:text-[11px]">
                  {text}
                </span>
              </span>
            </div>
          ))}
        </section>

        <section className="bg-[#f3f2ec] py-11 sm:py-14">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9343]">
                  Encontre o que precisa
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#19352a] sm:text-[30px]">
                  Compre por categoria
                </h2>
              </div>
              <button
                className="hidden items-center gap-1.5 pb-1 text-xs font-semibold text-[#58684e] hover:text-[#19352a] sm:flex"
                onClick={() => goToProducts()}
              >
                Ver todos os produtos <ArrowRight size={15} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {categories.map(({ name, icon: Icon, description }) => (
                <button
                  className="group flex min-h-[128px] flex-col items-start rounded-2xl border border-[#e8e6df] bg-[#fbfaf7] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#cbd2b9] hover:shadow-[0_10px_30px_rgba(25,53,42,0.06)] sm:min-h-[154px] sm:p-5"
                  key={name}
                  onClick={() => goToProducts(name)}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff1e6] text-[#61734c] transition group-hover:bg-[#e5f05a] group-hover:text-[#19352a]">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-[#243a2c]">{name}</span>
                  <span className="mt-1 text-[10px] text-[#8b9289] sm:text-xs">{description}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-12 sm:py-16 lg:px-8" id="produtos">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a9343]">
                Pra deixar tudo em ordem
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#19352a] sm:text-[30px]">
                {selectedCategory === "Todos" ? "Favoritos da galera" : selectedCategory}
              </h2>
            </div>
            <label className="flex items-center gap-2 self-start text-xs text-[#768076] sm:self-auto">
              <ArrowDownWideNarrow size={15} />
              <span className="sr-only">Ordenar produtos por</span>
              <select
                className="cursor-pointer bg-transparent py-2 pr-5 text-xs font-medium text-[#40533f] outline-none"
                onChange={(event) => setSort(event.target.value)}
                value={sort}
              >
                <option value="featured">Em destaque</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none -ml-6" size={14} />
            </label>
          </div>

          {(search || selectedCategory !== "Todos") && (
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f3f2ec] px-4 py-3 text-xs text-[#647064]">
              <span>
                {filteredProducts.length} produto{filteredProducts.length === 1 ? "" : "s"} encontrado
                {filteredProducts.length === 1 ? "" : "s"}
                {search ? ` para “${search}”` : ""}
              </span>
              <button
                className="font-semibold text-[#536648] underline underline-offset-2"
                onClick={() => {
                  setSearch("")
                  setSelectedCategory("Todos")
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-6">
              {filteredProducts.map((product) => (
                <article className="group min-w-0" key={product.id}>
                  <div className="product-image relative aspect-[1/1.05] overflow-hidden rounded-2xl bg-[#f0eee8]">
                    <img
                      alt={product.imageAlt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                      src={product.image}
                    />
                    {product.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#e5f05a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.07em] text-[#324328] sm:text-[10px]">
                        {product.badge}
                      </span>
                    )}
                    <button
                      aria-label={`Adicionar ${product.name} à lista de desejos`}
                      aria-pressed={favorites.includes(product.id)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#758074] transition hover:text-[#a76255]"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={favorites.includes(product.id) ? "fill-[#a76255] text-[#a76255]" : ""}
                        size={15}
                      />
                    </button>
                    <button
                      className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-[#19352a] px-3 py-2.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all hover:bg-[#294d3d] group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Adicionar ao carrinho</span>
                      <span className="sm:hidden">Adicionar</span>
                    </button>
                  </div>
                  <div className="px-0.5 pt-3">
                    <div className="flex items-center gap-1 text-[10px] text-[#a28a3d]">
                      <Star size={12} fill="currentColor" strokeWidth={1.5} />
                      <span className="font-semibold text-[#677065]">{product.rating}</span>
                      <span className="text-[#a1a69d]">({product.reviews})</span>
                    </div>
                    <p className="mt-1.5 line-clamp-1 text-[13px] font-semibold text-[#263a2d] sm:text-sm">
                      {product.name}
                    </p>
                    <p className="mt-1 line-clamp-1 text-[10px] text-[#92988f] sm:text-xs">
                      {product.detail}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-bold tracking-[-0.02em] text-[#19352a] sm:text-base">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-[#a2a69e] line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[#d8dbce] px-5 py-14 text-center">
              <Search className="mx-auto text-[#8b9677]" size={24} />
              <p className="mt-3 font-semibold text-[#304632]">Não encontramos esse produto.</p>
              <p className="mt-1 text-sm text-[#858d82]">
                Tente outro termo ou escolha uma categoria.
              </p>
              <button
                className="mt-4 text-sm font-semibold text-[#526946] underline underline-offset-4"
                onClick={() => {
                  setSearch("")
                  setSelectedCategory("Todos")
                }}
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </section>

        <section className="px-5 pb-12 sm:pb-16 lg:px-8" id="sobre">
          <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 overflow-hidden rounded-[22px] bg-[#19352a] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10 sm:py-9">
            <div className="max-w-[520px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6e455]">
                Quem entende, escolhe Eletro Pronto
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-[30px]">
                Pronto para melhor atendê-lo.
              </h2>
              <p className="mt-2 max-w-[460px] text-xs leading-5 text-white/65 sm:text-sm">
                A gente acredita em bons materiais, atendimento de verdade e no orgulho de um
                serviço bem-feito. Pode contar com a gente.
              </p>
            </div>
            <button
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e5f05a] px-5 py-3 text-xs font-bold text-[#19352a] transition hover:bg-[#eef583]"
              onClick={() => goToProducts()}
            >
              Conheça nossos produtos <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#eae8e2] bg-[#f4f2ec]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#19352a] text-[#e5f05a]">
                <Zap size={20} fill="currentColor" />
              </span>
              <span className="text-base font-extrabold tracking-[-0.06em] text-[#19352a]">
                Eletro Pronto<span className="text-[#9da83a]">.</span>
              </span>
            </div>
            <p className="mt-3 max-w-[255px] text-xs leading-5 text-[#7c8479]">
              Materiais elétricos escolhidos com cuidado para projetos que fazem a diferença.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#263a2d]">Atendimento</h3>
            <p className="mt-3 text-xs leading-6 text-[#7c8479]">
              Seg a sex, das 8h às 18h
              <br />
              contato@eletropronto.com.br
              <br />
              (11) 4000-2026
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#263a2d]">Acompanhe</h3>
            <div className="mt-3 flex gap-2">
              {[Camera, Globe].map((Icon, index) => (
                <a
                  aria-label={index === 0 ? "Instagram Eletro Pronto" : "Facebook Eletro Pronto"}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0ded6] text-[#596b54] transition hover:border-[#19352a] hover:bg-white"
                  href={index === 0 ? "https://instagram.com" : "https://facebook.com"}
                  key={index}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#263a2d]">Uma dose de energia na sua caixa de entrada</h3>
            <form className="mt-3 flex gap-2" onSubmit={submitNewsletter}>
              <input
                aria-label="Seu e-mail"
                className="min-w-0 flex-1 rounded-full border border-[#e0ded6] bg-[#fbfaf7] px-4 py-2.5 text-xs outline-none placeholder:text-[#9da39a] focus:border-[#8d9840]"
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Seu melhor e-mail"
                type="email"
                value={newsletterEmail}
              />
              <button
                aria-label="Inscrever-se na newsletter"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#19352a] text-white transition hover:bg-[#294d3d]"
                type="submit"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {newsletterMessage && (
              <p className="mt-2 text-[10px] text-[#536d48]">{newsletterMessage}</p>
            )}
          </div>
        </div>
        <div className="border-t border-[#e6e4dd] px-5 py-4 text-center text-[10px] text-[#92988f]">
          © 2026 Eletro Pronto Materiais Elétricos. Feito para quem faz acontecer.
        </div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            aria-label="Fechar carrinho"
            className="absolute inset-0 cursor-default bg-[#152319]/45 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
          />
          <aside
            aria-label="Seu carrinho"
            aria-modal="true"
            className="relative flex h-full w-full max-w-[440px] flex-col bg-[#fbfaf7] shadow-2xl"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-[#eae8e2] px-5 py-5 sm:px-7">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.03em] text-[#19352a]">
                  Sua sacola
                </h2>
                <p className="mt-0.5 text-xs text-[#838a80]">
                  {cartCount} {cartCount === 1 ? "item" : "itens"}
                </p>
              </div>
              <button
                aria-label="Fechar carrinho"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f0eee7]"
                onClick={() => setCartOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f1e9] text-[#6f7d5a]">
                  <ShoppingBag size={26} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-[#263a2d]">
                  Sua sacola está esperando
                </h3>
                <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#858d82]">
                  Encontre tudo para seu próximo projeto e adicione aqui.
                </p>
                <button
                  className="mt-5 rounded-full bg-[#19352a] px-5 py-3 text-xs font-semibold text-white hover:bg-[#294d3d]"
                  onClick={() => {
                    setCartOpen(false)
                    goToProducts()
                  }}
                >
                  Explorar produtos
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-7">
                  {shippingRemaining > 0 && (
                    <div className="my-4 rounded-xl bg-[#eff1e6] px-4 py-3">
                      <p className="text-xs leading-5 text-[#57674e]">
                        Faltam{" "}
                        <strong className="font-bold">{formatPrice(shippingRemaining)}</strong>{" "}
                        para garantir frete grátis.
                      </p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-[#a6b14b]"
                          style={{ width: `${Math.min((cartTotal / 199) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {cart.map(({ product, quantity }) => (
                    <div
                      className="flex gap-3 border-b border-[#eceae3] py-4"
                      key={product.id}
                    >
                      <img
                        alt={product.imageAlt}
                        className="h-[82px] w-[82px] shrink-0 rounded-xl bg-[#f0eee8] object-cover"
                        src={product.image}
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-semibold leading-5 text-[#263a2d]">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[10px] text-[#8c9389]">{product.detail}</p>
                          </div>
                          <button
                            aria-label={`Remover ${product.name}`}
                            className="shrink-0 p-1 text-[#a1a69c] hover:text-[#a76255]"
                            onClick={() => updateQuantity(product.id, -quantity)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-[#e6e4dd] bg-white">
                            <button
                              aria-label={`Diminuir quantidade de ${product.name}`}
                              className="p-1.5 text-[#657362] hover:text-[#19352a]"
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="min-w-6 text-center text-[11px] font-semibold">
                              {quantity}
                            </span>
                            <button
                              aria-label={`Aumentar quantidade de ${product.name}`}
                              className="p-1.5 text-[#657362] hover:text-[#19352a]"
                              onClick={() => updateQuantity(product.id, 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#19352a]">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#eae8e2] bg-white px-5 py-5 sm:px-7">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#727b71]">Subtotal</span>
                    <span className="font-bold text-[#19352a]">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-[#969c92]">
                    Frete e descontos calculados na próxima etapa.
                  </p>
                  <button
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#19352a] py-3.5 text-sm font-semibold text-white transition hover:bg-[#294d3d]"
                    onClick={() =>
                      setCheckoutMessage("Checkout demonstrativo: conecte um meio de pagamento para finalizar seu pedido.")
                    }
                  >
                    Continuar para finalizar <ArrowRight size={16} />
                  </button>
                  {checkoutMessage && (
                    <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-[#66784d]">
                      <Check className="mt-0.5 shrink-0" size={14} />
                      {checkoutMessage}
                    </p>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default Storefront
