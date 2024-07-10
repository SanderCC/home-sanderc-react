export default function SiteButton({icon, url, size}:{icon:string,url:string, size:number}) {
    return <a href={url} target={"_blank"} rel="noreferrer">
        <img src={icon}
             className={"iconButton"}
             height={size}
             width={size}
             alt={"Site button"} />
    </a>
}
