import styles from "./page.module.css"

export interface CVData {
    name: string
}

async function getCV() {
    // TODO fetch full CV data from API
    return {name: "Andy"}
}

export default async function Page() {
    const data = await getCV()
    return (
        <div className={styles["container"]}>
            <h1>Hi, I'm {data.name}</h1>
        </div>
    )
}
