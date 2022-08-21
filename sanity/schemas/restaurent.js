export default {
  name: 'restaurent',
  title: 'Restaurent',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurent Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },{
      name: "image",
      type: "image",
      title: "Image of the Restaurent",
    },{
      name: "lat",
      type: "number",
      title: "Latitude of the Restaurent",
    },{
      name: "long",
      type: "number",
      title: "Longitude of the Restaurent",
    },{
      name: "address",
      type: "string",
      title: " Restaurent Address",
      validation: (Rule) => Rule.required(),
    },{
      name: "rating",
      type: "number",
      title: "Enter Rating from (1-5) ",
      validation: (Rule) => Rule.required().min(1).max(5).error("Enter Vakue between 1-5"),
    },{
      name: 'type',
      title: 'Category',
      validation: Rule => Rule.required(),
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }]
    }
  ],
}
