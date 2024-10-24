import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../../context/DataContext"
import { CgClose, CgMathPlus } from "react-icons/cg"

const Pricing = () => {
    const { crud } = useContext(DataContext)
    const [pricing, setPricing] = useState([])



    // Holds the state for the pricing
    const [currentPricing, setCurrentPricing] = useState([])



    // Holds the error and loading state for the page
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)



    // Sets the states on init
    const fetchPricing = async () => {
        setLoading(true)

        const response = await crud({
            url: '/service/pricing/',
            method: 'get'
        })

        if(response.status == 200) {
            setPricing(response.data.data.pricing)
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }

    useEffect(() => {
        fetchPricing()
    }, [])


    useEffect(() => {
        if(pricing) setCurrentPricing([...pricing])
    }, [pricing])



    // Removes a service from the array
    const handleRemovePrice = async (id) => {
        setLoading(true)

        const response = await crud({
            url: `/service/pricing/${id}`,
            method: 'delete'
        })

        if(response.status == 204) {
            fetchPricing()
        }
        else setError('Нещо се обърка при премахването. Опитай пак.')

        setLoading(false)
    }



    // Adds a new service
    const handleAddPrice = async () => {
        setLoading(true)

        const newPrice = {
            title: `Услуга ${currentPricing.length + 1}`,
            price: `20`
        }

        const response = await crud({
            url: '/service/pricing/',
            method: 'post',
            body: newPrice
        })

        if(response.status == 201) {
            fetchPricing()
        }
        else setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Changes the title of a price
    const handleChangeTitle = (e, id) => {
        let newPricing = currentPricing.map(price => price._id === id ? {...price, title: e.target.value} : price)
        setCurrentPricing(newPricing)
    }



    // Changes the content of a price
    const handleChangeContent = (e, id) => {
        let newPricing = currentPricing.map(price => price._id === id ? {...price, price: e.target.value} : price)
        setCurrentPricing(newPricing)
    }



    // Makes a crud operation to the backend with the changed price
    const handleUpdatePrice = async (price) => {
        setLoading(true)

        const response = await crud({
            url: `/service/pricing/${price._id}`,
            method: 'put',
            body: {
                title: price.title,
                price: price.price
            }
        })
        
        if(response.status !== 200) setError('Нещо се обърка. Опитай пак.')

        setLoading(false)
    }



    // Saves the changes
    const handleSaveChanges = async () => {
        const changed = currentPricing.filter(price1 => {
            const price2 = pricing.find(price => price._id === price._id)

            if(price1.title !== price2.title || price1.price !== price2.price) {
                return price1
            }
            return false
        })

        await Promise.all(changed.map(async (price) => {
            await handleUpdatePrice(price);
        }))

        fetchPricing()
    }



    return (
        <section className="section-pricing">
            {
                loading &&
                <div className="overlay">
                    <div className="heart"></div>
                </div>
            }

            <div className="heading">
                <h2 className="title">Ценоразпис</h2>

                <button onClick={handleAddPrice} className="heading-btn">
                    <CgMathPlus />
                    <p>Добави</p>
                </button>
            </div>

            {
                error &&
                <p className="error">{error}</p>
            }
            
            <div className="service-grid">
                {
                    currentPricing &&
                    currentPricing.map((price, i) => (
                        <div key={i} className={`pricing-card ${i % 2 == 0 ? 'green' : 'red'}`}>
                            {
                                currentPricing.length > 1 &&
                                <CgClose
                                    className="service-icon"
                                    onClick={() => handleRemovePrice(price._id)}
                                />
                            }

                            <textarea
                                className="pricing-title title"
                                value={price.title}
                                onChange={(e) => handleChangeTitle(e, price._id)}
                                rows={3}
                            />
                            <p className="pricing-content">
                                <input
                                    type="number"
                                    value={price.price}
                                    onChange={(e) => handleChangeContent(e, price._id)}
                                    cols={3}
                                />
                                <span>лв.</span>
                            </p>
                        </div>
                    ))
                }
            </div>

            <button onClick={handleSaveChanges} className="btn">Запази промените</button>
        </section>
    )
}

export default Pricing