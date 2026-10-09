import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Storefront from "./Storefront"

describe("Storefront", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    })
  })

  it("filters products by search term", async () => {
    const user = userEvent.setup()

    render(<Storefront />)

    const searchInputs = screen.getAllByLabelText(/buscar produtos/i)
    await user.type(searchInputs[0], "Lâmpada")

    expect(screen.getByText(/1 produto encontrado para “Lâmpada”/i)).toBeInTheDocument()
    expect(screen.getByText(/Lâmpada LED Bulbo 12W/i)).toBeInTheDocument()
  })

  it("toggles a product as favorite", async () => {
    const user = userEvent.setup()

    render(<Storefront />)

    const favoriteButton = screen.getByLabelText(/adicionar lâmpada led bulbo 12w à lista de desejos/i)

    await user.click(favoriteButton)

    expect(favoriteButton).toHaveAttribute("aria-pressed", "true")
  })

  it("submits the newsletter form", async () => {
    const user = userEvent.setup()

    render(<Storefront />)

    const emailInput = screen.getByLabelText(/Seu e-mail/i)
    await user.type(emailInput, "cliente@teste.com")
    await user.click(screen.getByRole("button", { name: /inscrever-se na newsletter/i }))

    expect(
      screen.getByText(
        /Cadastro demonstrativo\. Conecte um serviço de e-mail para ativar o envio de novidades\./i,
      ),
    ).toBeInTheDocument()
  })
})
