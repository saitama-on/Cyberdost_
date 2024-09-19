const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const apiKey = "AIzaSyCxRDq_CrLhTdi2IGWvRizIITPlNtmII5A";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model you want to use
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function testGeminiApi() {
  const code = `print("hello world")`;
  const prompt = `explain this code , ${code}`;

  try {
    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Log the result
    console.log(result.response.text());
  } catch (error) {
    console.error("Error calling API:", error.message);
  }
}

// Call the function to test the API
testGeminiApi();

// Replace with your API key
// const apiKey = "AIzaSyCxRDq_CrLhTdi2IGWvRizIITPlNtmII5A";

// async function testGeminiApi() {
//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
//       {
//         prompt: {
//           text: "Test if this API is working.",
//         },
//         temperature: 0.7,
//         candidateCount: 1,
//         maxOutputTokens: 100
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     console.log("API Response:", response.data.candidates[0].output);
//   } catch (error) {
//     console.error("Error calling API:", error.response?.data || error.message);
//   }
// }

// testGeminiApi();


// // Example code with potential SQL injection vulnerability
// function getUser(id) {
//     let query = "SELECT * FROM users WHERE id = '" + id + "'";  // SQL Injection Vulnerability
//     db.execute(query);
// }

// // Example c>ode with potential XSS vulnerability
// function setInnerHTML(content) {
//     document.getElementById("output").innerHTML = content;  // XSS Vulnerability
// }

// // Example compliance issue (eval usage)
// let script = "alert('Hello')";
// eval(script);  // Non-compliant usage of eval