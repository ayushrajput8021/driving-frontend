import Heading from "./Heading";


export default function TestRules() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <Heading title='Test Rules' className='text-2xl' />
      <ul className='list-disc'>
          <li>Test can be attempted many times until you get passed.</li>
          <li>Each test will have 20 questions.</li>
          <li>Each question will have 3 options.</li>
          <li>Each question will have 20 seconds to answer.</li>
          <li>Questions are divided into 4 categories.</li>
          <li>Each category will have 5 questions.</li>
          <li>Each question will have 1 mark.</li>
          <li>Test will be of 20 marks.</li>
          <li>For passing you have to score more than 12 in total.</li>
          <li>For each category you have to score more than 3.</li>
          <li>There is no negative marking.</li>
        </ul>
    </div>
  )
}
