import { useEffect, useState, useRef } from "react"
import { debounce } from "../services/util.service.js"

export function BugFilter({ filterBy, onSetFilterBy }){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, severity } = filterByToEdit
    return (
        <section>
            <h2>Filter Bugs</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">title: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By Title" id="title" name="title" />

                <label htmlFor="severity">Severity: </label>
                <input value={severity} onChange={handleChange} type="number" placeholder="By min Severity" id="severity" name="severity" />

            </form>
        </section>
    )

}