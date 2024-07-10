export default function SiteButton({icon, url, size}:{icon:string,url:string, size:number}) {
    return <img onClick={() => window.open(url, "_blank")}
                src={icon}
                className={"iconButton"}
                height={size}
                width={size}
                alt={"Site button"} />
}