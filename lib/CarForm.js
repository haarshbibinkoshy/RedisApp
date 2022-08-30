export default function CarForm(){
const handleSubmit= async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(event.target.make.value);
    console.log(event.target.model.value);
    console.log(event.target.image.value);
    console.log(event.target.description.value);
    const formData = Object.fromEntries(form.entries())

    console.log(`formData>>>`,formData);

    const res =await fetch('/api/cars',{
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    })

    const result= await res.json();
    console.log(`result>>>`,result);
}
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="make" placeholder="Make" />
            <input type="text" name="model" placeholder="Model"/>
            <input type="text" name="image" placeholder="Image Url" />
            <textarea name="description" type="text" placeholder="Description" />
            <button type="submit">Create car</button>
        </form>
    )
}