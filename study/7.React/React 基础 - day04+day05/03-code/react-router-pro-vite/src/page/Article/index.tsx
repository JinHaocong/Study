import {useLocation, useParams, useSearchParams} from "react-router-dom"

const Article = () => {
    // sign searchParams传参
    const [params1] = useSearchParams()
    const id1 = params1.get('id')
    const name1 = params1.get('name')

    // sign params传参
    const params = useParams()
    const id = params.id
    const name = params.name

    // sign state传参
    const location = useLocation()
    const name2 = location.state.name
    const id2 = location.state.id
    return (
        <>
            <div>我是文章页-params传参{id}-{name}</div>
            <div>我是文章页-searchParams传参{id1}-{name1}</div>
            <div>我是文章页-state传参{id2}-{name2}</div>
        </>
    )
}

export default Article
