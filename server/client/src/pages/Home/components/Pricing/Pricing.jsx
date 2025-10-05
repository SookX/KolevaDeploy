import { useContext, useEffect, useState } from "react"
import SectionHeading from "../../../../components/SectionHeading/SectionHeading"
import { DataContext } from "../../../../context/DataContext"

const Pricing = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the pricing
    const [pricing, setPricing] = useState([])



    // Holds the error state
    const [error, setError] = useState(null)



    // Gets the pricing from the backend on init
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                url: '/service/pricing/',
                method: 'get'
            })

            if(response.status == 200) setPricing(response.data.data.pricing)
            else setError('Нещо се обърка. Опитай пак.')
        }

        fetching()
    }, [])



    // Converts the price to euro
    const bgnToEuro = (price) => {
        return Math.round(price * 100 / 1.955) / 100
    }



    return (
        <div id="pricing">
            <SectionHeading title='Ценоразпис' />
            <section className="section-pricing">
                {
                    pricing.map((price, i) => (
                        <div className={`pricing-card ${i % 2 == 0 ? 'green' : 'red'}`}>
                            <h4 className="pricing-title title">{price.title}</h4>
                            <div>
                                <p className="pricing-content">{price.price} лв.</p>
                                <p className="pricing-euro">{bgnToEuro(price.price)} <span className="euro-symbol">€</span></p>
                            </div>
                        </div>
                    ))
                }

                {
                    error &&
                    <p className="error">{error}</p>
                }
            </section>
        </div>
    )
}

export default Pricing