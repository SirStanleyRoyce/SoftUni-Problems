export default function ErrorPage({location}){
    
    return(
        <h3 className="no-articles">{location.state?.object || 'Page'} not found.</h3>
    );
}