# Node.js-Based Game "Alias" with Chat and Word Checking

## Table of Contents

1. [Description](#description)
2. [System requirements](#system-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)

    4.1 [User Management](#user-management)

    - User data model.
    - Endpoint **/api/v1/auth/register**
    - Endpoint **/api/v1/auth/login**
    - Endpoint **/api/v1/auth/logout**
    - Endpoint **/api/v1/users**
    - Endpoint **/api/v1/users/{userId}**
    - Endpoint **/api/v1/users/{userId}/stats**
    - Endpoint **/api/v1/leaderboard**

    4.2 [Team Management](#team-management)

    - Team data model.
    - Endpoint **/api/v1/rooms/{roomId}/teams**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}/players**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}/players/{userId}**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}/describer**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}/leader**
    - Endpoint **/api/v1/rooms/{roomId}/teams/{teamId}/chat**

## Description

Alias is a word-guessing game where players form teams. Each team takes turns where one member describes a word and others guess it. The game includes a chat for players to communicate and a system to check for similar words.

### Objective
Teams try to guess as many words as possible from their teammates' descriptions.

### Turns
Each turn is timed. Describers cannot use the word or its derivatives.

### Scoring
Points are awarded for each correct guess. Similar words are checked for validation.

### End Game
The game concludes after a predetermined number of rounds, with the highest-scoring team winning.

## System Requirements
- **Programming language**: JavaScript, TypeScript
- **Backend**: Node.js framework - Nest.js
- **Frontend framework**: React.js
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker

## Base URL

The base URL for accessing the Game "Alias" with Chat and Word Checking API is:

`http://localhost:8080/api/v1/`

All endpoints for the Game "Alias" API can be accessed through this base URL.

**Example Usage** To make a request to the API, prepend the base URL to the
endpoint path. For instance, to access the registration endpoint:

`GET http://localhost:8080/api/v1/auth/register`

## API Documentation

### User Management

#### 1. User data model

Information about users.

| Key  | Column Name    | Data Type    | Description                                   |
| :--- | :------------- | :----------- | :-------------------------------------------- |
| PK   | userId         | int          | Unique identifier for each user (Primary Key) |
|      | username       | varchar(50)  | Username chosen by the user (must be unique)  |
|      | hashedPassword | varchar(255) | Encrypted password for user authentication    |
|      | salt           | varchar(50)  | Salt used to secure the user's password       |
|      | score          | int          | Total points scored by the user in the game   |
|      | played         | int          | Number of games the user has participated in  |
|      | wins           | int          | Number of games the user has won              |

#### 2. Register a new user

Endpoint

- URL Path: **_/api/v1/auth/register_**
- Description: This endpoint registers a new user. It accepts user details in
  the request body and returns a response indicating the result of the
  registration process.
- Authentication: No authentication required for this endpoint.

**Request Body**

The request body must be in JSON format and include the following fields:

- username: (string, required): The username of the new user. Must be unique and
  between 3-50 characters.
- password: (string, required): The password for the new user. Should meet
  security requirements such as minimum length, inclusion of special characters.

**Example Request**

Description: A `POST` request to the user registration endpoint. It includes a
JSON payload in the request body with the user's name, and password for
registration.

```

curl -X POST http://localhost:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "Alex",
  "password": "SecurePass!123"
}'

```

**Example Responses**

Status code: **201 Created**

Description: The user has been successfully registered. The response includes a
success message and the data with the userId of the newly created user.

```
{
    "message": "User registered successfully.",
    "data": {
        "userId": 1
    }
}
```

Status code: **400 Bad Request**

Description: The request was invalid because one or more of the provided fields
(username, or password) did not meet the required format or were missing.

```
{
    "message": "All fields are required and must be in a valid format."
}
```

Status code: **409 Conflict**

Description: This response indicates that the request could not be processed
because the username is already in use.

```
{
    "message": "Username already in use."
}
```

Status code: **500 Internal Server Error**

Description: This response indicates an unexpected error occurred during the
registration process.

```
{
    "message": "An unexpected error occurred during registration."
}
```

#### 3. Logs a user into the system

Endpoint

- URL Path: **_/api/v1/auth/login_**
- Description: This endpoint logs a user into the system by validating their
  username and password. Upon successful authentication, the user receives both
  an access token and a refresh token. The access token is used for subsequent
  authenticated requests, while the refresh token is used to obtain a new access
  token when the original expires.
- Authentication: No authentication required for this endpoint.

**Request Body**

The request body should be in JSON format and include the following fields:

- username: The user's username;
- password: The user's password.

**Example Request**

Description: A `POST` request to the login endpoint for user authentication. It
includes a JSON payload in the request body with the user's username and
password.

```

curl -X POST http://localhost:8080/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "Alex",
  "password": "SecurePass!123"
}'

```

**Example Responses**

Status code: **200 OK**

Description: This status indicates that the login request was successful. The
server responds with a JSON object containing an access token, a refresh token,
and a success message.

```
{
    "message": "User logged successfully.",
    "data": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "refresh_token": "d1Gh9zG8eXpz1I2kA6vR"
    }
}
```

Status code: **400 Bad Request**

Description: The provided username or password is missing.

```
{
    "message": "Username and password are required."
}
```

Status code: **401 Unauthorized**

Description: The login request failed due to incorrect username.

```
{
    "message": "User does not exist."
}
```

Description: The login request failed due to incorrect password.

```
{
    "message": "Incorrect username or password."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected condition that prevented it
from processing the request. This issue may occur during token creation or other
parts of the login process, preventing the user from receiving a valid access
or refresh token.

```
{
    "message": "An unexpected error occurred during login."
}
```

#### 4. Logs a user out of the system

Endpoint

- URL Path: **_/api/v1/auth/logout_**
- Description: This endpoint allows users to log out of the application by
  invalidating the refresh token, and optionally clearing any session data.
  After logging out, the user must authenticate again to access protected
  resources.
- Authentication: Requires the user to provide a valid access token in the
  request headers to authorize the logout operation.

**Request Body**

This endpoint does not require a request body. Logout actions are handled based
on the authenticated user's token.

**Example Request**

Description: A `POST` request to log out the authenticated user. It requires the
user to pass their access token in the request header.

```

curl -X POST http://localhost:8080/api/v1/auth/login \
-H "Authorization: Bearer access_token" \

```

**Example Responses**

Status code: **200 OK**

Description: The logout request was successful. The refresh token is
invalidated, and the user is logged out from the system. The user should
delete any stored tokens.

```
{
    "message": "User logged out successfully."
}
```

Status code: **401 Unauthorized**

Description: The request failed because the access token is missing, invalid, or
expired.

```
{
    "message": "Invalid or missing access token."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the
logout request. This may happen due to issues during token invalidation or other
server-side problems.

```
{
    "message": "An unexpected error occurred during logout."
}
```

#### 5. Retrieves a list of all users

Endpoint

- URL Path: **_/api/v1/users_**
- Description: This endpoint retrieves a list of all registered users in the
  system. The response includes details for each user.
- Authentication: Requires a valid access token with admin or moderator
  privileges.

**Example Request**

Description: A `GET` request to retrieve a list of all users.

```

curl -X GET http://localhost:8080/api/v1/users \
-H "Authorization: Bearer access_token" \

```

**Example Responses**

Status code: **200 OK**

Description: The request was successful, and the response contains an array of
user objects.

```
[
    {
        "userId": 1,
        "username": "Alex",
        "hashedPassword": "$2b$10$KJHjdlfDkSDF3nX8DJfksw==",
        "salt": "a3g6t7",
        "score": 1500,
        "played": 20,
        "wins": 10
    },
    {
        "userId": 2,
        "username": "JaneDoe",
        "hashedPassword": "$2b$10$YKD35lKD5rflj3KE0sd/",
        "salt": "l4j3t2",
        "score": 1800,
        "played": 25,
        "wins": 15
    }
]
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided
token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required admin privileges to perform
this operation.

```
{
    "message": "Access denied. Admin privileges required."
}
```

Status Code: **404 Not Found**

Description: The server cannot find any users in the database.

```
{
    "message": "No users found in the database."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the
request.

```
{
    "message": "An unexpected error occurred while retrieving the user list."
}
```

#### 6. Retrieve a specific user by ID

Endpoint

- URL Path: **_/api/v1/users/{userId}_**
- Description: This endpoint retrieves the details of a specific user based on
  the provided user ID. It returns user information such as username, score,
  total games played, and wins.
- Authentication: Requires authentication. A valid access token must be provided
  in the request headers.

**Request Parameter**

The request should include the following path parameter:

- userId: The unique identifier of the user to retrieve.

**Example Request**

Description: A `GET` request to the user details endpoint, including the user's
ID in the URL.

```

curl -X GET http://localhost:8080/api/v1/users/2 \
-H "Authorization: Bearer access_token" \

```

**Example Responses**

Status code: **200 OK**

Description: This status indicates that the request was successful, and the
server returns the requested user details.

```
{
      "userId": 2,
      "username": "JaneDoe",
      "hashedPassword": "$2b$10$YKD35lKD5rflj3KE0sd/",
      "salt": "l4j3t2",
      "score": 1800,
      "played": 25,
      "wins": 15
}
```

Status code: **400 Bad Request**

Description: The valid user ID must be provided to proceed.

```
{
    "message": "Invalid user ID."
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided
token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status code: **404 Not Found**

Description: This status indicates that the specified user ID does not exist in
the system.

```
{
    "message": "User not found."
}
```

Status Code: **500 Internal Server Error**

Description: An unexpected error occurred on the server while processing the
request.

```
{
    "message": "An unexpected error occurred while retrieving the user."
}
```

#### 7. Delete a specific user

Endpoint

- URL Path: **_/api/v1/users/{userId}_**
- Description: This endpoint allows a user to delete their own account. It
  requires user confirmation before proceeding with the deletion to prevent
  accidental loss of data. By default, the deletion performs a soft delete
  (marking the user as inactive) but can be configured for a hard delete
  (permanent removal of the user record) using a query parameter.
- Authentication: This endpoint requires the user to be authenticated with a
  valid token.

**Request Parameter**

The request must include the following path parameter:

- userId: The unique identifier of the user requesting the deletion (the
  logged-in user's ID).

Optional query parameter:

- hardDelete: If set to 'true', performs a hard delete instead of a soft delete.

**Example Request**

Description: A `DELETE` request to soft delete the authenticated user’s account.
This request must include an authorization token for the user.

```

curl -X DELETE http://localhost:8080/api/v1/users/2 \
-H "Authorization: Bearer access_token" \

```

Description: A `DELETE` request to hard delete the authenticated user’s account.

```

curl -X DELETE http://localhost:8080/api/v1/userId/123?hardDelete=true \
-H "Authorization: Bearer access_token" \

```

**Example Responses**

Status Code: **200 OK**

Description: The user account was successfully deleted (soft or hard).

```
{
    "message": "User account soft deleted successfully."
}
```

```
{
    "message": "User account hard deleted successfully."
}
```

Status Code: **400 Bad Request**

Description: The provided user ID is invalid or missing.

```
{
    "message": "User ID is required."
}
```

```
{
    "message": "Invalid user ID."
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided
token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required admin privileges to perform
this operation.

```
{
    "message": "Access denied. Admin privileges required."
}
```

Status Code: **404 Not Found**

Description: This status indicates that the specified user ID does not exist in
the system.

```
{
    "message": "User not found."
}
```

Status Code: **500 Internal Server Error**

Description: An unexpected error occurred on the server while processing the
request.

```
{
    "message": "An unexpected error occurred while deleting the user's account."
}
```

#### 8. Retrieve game statistics for a specific user

Endpoint

- URL Path: **_/api/v1/users/{userId}/stats_**
- Description: This endpoint retrieves the game statistics for a specific user,
  including the user's score, total games played, and total wins. Access to this
  endpoint requires authentication.
- Authentication: This endpoint requires the user to be authenticated with a
  valid token.

**Request Parameter**

The request must include the following path parameter:

- userId: The unique identifier of the user for whom the statistics are being
  requested.

**Example Request**

Description: A `GET` request to retrieve the statistics for a user with the
specified user ID.

```

curl -X GET http://localhost:8080/api/v1/users/2/stats \
-H "Authorization: Bearer access_token" \

```

**Example Responses**

Status Code: **200 OK**

Description: The request was successful, and the response contains the
statistics for the specified user.

```
[
    {
        "userId": 1,
        "username": "Alex",
        "score": 1500,
        "played": 20,
        "wins": 10
    },
    {
        "userId": 2,
        "username": "JaneDoe",
        "score": 1800,
        "played": 25,
        "wins": 15
    }
]
```

Status Code: **404 Not Found**

Description: This status indicates that the specified user ID does not exist in
the system.

```
{
    "message": "User not found."
}
```

Status Code: **500 Internal Server Error**

Description: An unexpected error occurred on the server while processing the
request.

```
{
    "message": "An unexpected error occurred while retrieving user statistics."
}
```

#### 9. Retrieve leaderboard

Endpoint

- URL Path: **_/api/v1/leaderboard_**
- Description: This endpoint retrieves the top players based on their game
  statistics, including score and wins. The response contains a ranked list of
  players, providing insights into the performance of the best players in the
  game.
- Authentication: This endpoint does not require authentication. Any user can
  access the leaderboard.

**Example Request**

Description: A `GET` request to retrieve the leaderboard.

```

curl -X GET http://localhost:8080/api/v1/leaderboard \

```

**Example Responses**

Status Code: **200 OK**

Description: This status indicates that the request was successful, and the
server returns the leaderboard data.

```
[
    {
        "userId": 1,
        "username": "Alex",
        "score": 1800,
        "played": 28,
        "wins": 15
    },
    {
        "userId": 2,
        "username": "Jane",
        "score": 1500,
        "played": 20,
        "wins": 10
    }
]
```

Status Code: **400 Bad Request**

Description: The provided user ID is invalid or missing.

```
{
    "message": "User ID is required."
}
```

```
{
    "message": "Invalid user ID."
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided
token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **404 Not Found**

Description: The server cannot find any users in the database.

```
{
    "message": "No users found in the database."
}
```

Status Code: **500 Internal Server Error**

Description: An unexpected error occurred on the server while processing the
request.

```
{
    "message": "An unexpected error occurred while retrieving the leaderboard."
}
```

### Team Management

#### 1. Team data model

Information about users.

| Key  | Column Name    | Data Type    | Description                                   |
| :--- | :------------- | :----------- | :-------------------------------------------- |
|      | teamId         | ObjectId          | Unique identifier for each team |
|      | roomId         | ObjectId          | Unique identifier for the team's room |
|      | name       | string  | Username chosen by the user (must be unique)  |
|      | score          | int          | Total points scored by the team during this game  |
|      | players          | ObjectId[]          | Array of ids of team's players  |
|      | describer          | ObjectId          | Unique identifier of the player who describes the word |
|      | teamLeader          | ObjectId          | Unique identifier of the player who makes a word guess |
|      | selectedWord          | ObjectId          | Unique identifier for the record of the word to guess |
|      | tryedWords          | string[]          | Array of words tryed by players |

GET `api/v1/v1/rooms/{roomId}/teams`

- Description: Method to get all the room's teams.
- Authentication: This endpoint requires the user to be authenticated with a valid access token

**Request Body**

Empty

**Example Request**

Description: A GET request to retrieve a list of all teams in a specific room.

```sh
curl -X GET http://localhost:8080/api/v1/rooms/{roomId}/teams \
-H "Authorization: Bearer access_token" 
```

**Example Responses**

Status code: **200 OK**

Description: The request was successful, and the response contains an array of team objects.

```
[
    {
        "teamId": "60d5f9a2b0f8b8e17a15f5f1",
        "roomId": "60d5f9a2b0f8b8e17a15f5f0",
        "name": "Alpha Team",
        "score": 250,
        "players": [
            "60d5f9a2b0f8b8e17a15f5f2",
            "60d5f9a2b0f8b8e17a15f5f3"
        ],
        "describer": "60d5f9a2b0f8b8e17a15f5f2",
        "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
        "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
        "tryedWords": ["apple", "banana", "orange"]
    },
    {
        "teamId": "60d5f9a2b0f8b8e17a15f5f5",
        "roomId": "60d5f9a2b0f8b8e17a15f5f0",
        "name": "Beta Team",
        "score": 180,
        "players": [
            "60d5f9a2b0f8b8e17a15f5f6",
            "60d5f9a2b0f8b8e17a15f5f7"
        ],
        "describer": "60d5f9a2b0f8b8e17a15f5f6",
        "teamLeader": "60d5f9a2b0f8b8e17a15f5f7",
        "selectedWord": "60d5f9a2b0f8b8e17a15f5f8",
        "tryedWords": ["grape", "peach"]
    }
]
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required permissions to access the teams in this room.


```
{
    "message": "Access denied. Insufficient permissions."
}
```
Status Code: **404 Not Found**

Description: The specified room cannot be found or there are no teams associated with the room.

```
{
    "message": "No teams found for the specified room."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while retrieving the teams."
}
```

POST `api/v1/rooms/{roomId}/teams`

Description: Method to create a new team in the specified room.
    Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body:**


name (string): The name of the team.

players (array of strings): An array of player IDs to be added to the team.

**Example Request**

Description: A POST request to create a new team in a specific room.

```
curl -X POST http://localhost:8080/api/v1/rooms/{roomId}/teams \
-H "Authorization: Bearer access_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "Gamma Team",
    "players": [
        "60d5f9a2b0f8b8e17a15f5f2",
        "60d5f9a2b0f8b8e17a15f5f3"
    ],
    "describer": "60d5f9a2b0f8b8e17a15f5f2",
    "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
    "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
    "tryedWords": []
}'
```
**Example Responses**

Status code: **201 Created**

Description: The team was successfully created, and the response contains the created team object.

```
{
    "teamId": "60d5f9a2b0f8b8e17a15f5f9",
    "roomId": "60d5f9a2b0f8b8e17a15f5f0",
    "name": "Gamma Team",
    "score": 0,
    "players": [
        "60d5f9a2b0f8b8e17a15f5f2",
        "60d5f9a2b0f8b8e17a15f5f3"
    ],
    "describer": "60d5f9a2b0f8b8e17a15f5f2",
    "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
    "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
    "tryedWords": []
}
```
Status Code: **400 Bad Request**

Description: The request body is missing required fields or contains invalid data.

```
{
    "message": "Invalid input. Please provide all required fields."
}
```
Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```
Status Code: **403 Forbidden**

Description: The user does not have the required permissions to create a team in this room.

```
{
    "message": "Access denied. Insufficient permissions."
}
```

Status Code: **404 Not Found**

Description: The specified room cannot be found.

```
{
    "message": "Room not found."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while creating the team."
}
```

GET `api/v1/rooms/{roomId}/teams/{teamId}`

Description: Method to retrieve a specific team by its ID in the specified room.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request body**

Empty

**Example Request**

Description: A GET request to retrieve details of a specific team in a specific room.

```
curl -X GET http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId} \
-H "Authorization: Bearer access_token"
```

**Example Responses**

Status code: **200 OK**

Description: The request was successful, and the response contains the details of the requested team.

```
{
    "teamId": "60d5f9a2b0f8b8e17a15f5f1",
    "roomId": "60d5f9a2b0f8b8e17a15f5f0",
    "name": "Alpha Team",
    "score": 250,
    "players": [
        "60d5f9a2b0f8b8e17a15f5f2",
        "60d5f9a2b0f8b8e17a15f5f3"
    ],
    "describer": "60d5f9a2b0f8b8e17a15f5f2",
    "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
    "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
    "tryedWords": ["apple", "banana", "orange"]
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required permissions to access the team in this room.

```
{
    "message": "Access denied. Insufficient permissions."
}
```
Status Code: **404 Not Found**

Description: The specified team cannot be found in the specified room.

```
{
    "message": "Team not found."
}
```
Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while retrieving the team."
}
```

PUT `api/v1/rooms/{roomId}/teams/{teamId}`

Description: Method to update the details of a specific team in the specified room.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**


name (string, optional): The updated name of the team.

players (array of strings, optional): An updated array of player IDs to be added to the team.

describer (string, optional): The updated ID of the user who will describe the selected word.

teamLeader (string, optional): The updated ID of the user who will lead the team.

selectedWord (string, optional): The updated ID of the word selected for the game.

tryedWords (array of strings, optional): An updated array of words that have been tried by the team.

**Example Request**

Description: A PUT request to update a specific team in a specific room.

```
curl -X PUT http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId} \
-H "Authorization: Bearer access_token" \
-H "Content-Type: application/json" \
-d '{
    "name": "Alpha Team Updated",
    "players": [
        "60d5f9a2b0f8b8e17a15f5f2",
        "60d5f9a2b0f8b8e17a15f5f3"
    ],
    "describer": "60d5f9a2b0f8b8e17a15f5f2",
    "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
    "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
    "tryedWords": ["apple", "banana"]
}'
```
**Example Responses**

Status code: **200 OK**

Description: The team was successfully updated, and the response contains the updated team object.

```
{
    "teamId": "60d5f9a2b0f8b8e17a15f5f1",
    "roomId": "60d5f9a2b0f8b8e17a15f5f0",
    "name": "Alpha Team Updated",
    "score": 250,
    "players": [
        "60d5f9a2b0f8b8e17a15f5f2",
        "60d5f9a2b0f8b8e17a15f5f3"
    ],
    "describer": "60d5f9a2b0f8b8e17a15f5f2",
    "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
    "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
    "tryedWords": ["apple", "banana"]
}
```

Status Code: **400 Bad Request**

Description: The request body is missing required fields or contains invalid data.

```
{
    "message": "Invalid input. Please provide valid fields."
}
```
Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```
Status Code: **403 Forbidden**

Description: The user does not have the required permissions to update the team in this room.

```
{
    "message": "Access denied. Insufficient permissions."
}
```
Status Code: **404 Not Found**

Description: The specified team or room cannot be found.

```
{
    "message": "Team or room not found."
}
```
Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while updating the team."
}
```


DELETE `api/v1/rooms/{roomId}/teams/{teamId}`

Description: Method to delete a specific team in the specified room.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request body:**

Empty

**Example Request**

Description: A DELETE request to remove a specific team from a specific room.

```
curl -X DELETE http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId} \
-H "Authorization: Bearer access_token"
```

**Example Responses**

Status code: **204 No Content**

Description: The request was successful, and the team has been deleted. No content is returned in the response.

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required permissions to delete the team in this room.

```
{
    "message": "Access denied. Insufficient permissions."
}
```

Status Code: **404 Not Found**

Description: The specified team or room cannot be found.

```
{
    "message": "Team or room not found."
}
```

Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while deleting the team."
}
```

GET `api/v1/rooms/{roomId}/teams/{teamId}/players`

    Description: Method to get all players in a specific team within a specified room.
    Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**

Empty

**Example Request**

Description: A GET request to retrieve a list of all players in a specific team of a specific room.

```
curl -X GET http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId}/players \
-H "Authorization: Bearer access_token"
```

**Example Responses**

Status code: **200 OK**

Description: The request was successful, and the response contains an array of player objects.

```
[
    {
        "userId": "60d5f9a2b0f8b8e17a15f5f3",
        "username": "Alex",
        "score": 1500,
        "played": 20,
        "wins": 10
    },
    {
        "userId": "60d5f9a2b0f8b8e17a15f5f3",
        "username": "Jack",
        "score": 3000,
        "played": 29,
        "wins": 15
    }
]
```
Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid. Ensure that the correct authentication token is provided.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have the required permissions to access the players in this team.

```
{
    "message": "Access denied. Insufficient permissions."
}
```

Status Code: **404 Not Found**

Description: The specified room or team cannot be found, or there are no players associated with the team.

```
{
    "message": "No players found for the specified team."
}
```
Status code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while retrieving the players."
}
```

POST `api/v1/rooms/{roomId}/teams/{teamId}/players/{userId}`

Description: Method to add a player (specified by userId) to a team in a particular room.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**

Empty

**Example Request**

Description: A POST request to add a player (specified by userId) to a team in a specific room.

```
curl -X POST http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId}/players/{userId} \
-H "Authorization: Bearer access_token"
```

**Example Responses**

Status Code: **201 Created**

Description: The player was successfully added to the specified team.

```
{
    "message": "Player added to the team successfully."
}
```
Status Code: **400 Bad Request**

Description: The request was malformed, possibly due to incorrect or missing parameters.

```
{
    "message": "Invalid room, team, or user ID."
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have sufficient permissions to add players to this team.

```
{
    "message": "Access denied. Insufficient permissions."
}
```

Status Code: **404 Not Found**

Description: The specified room, team, or user cannot be found.

```
{
    "message": "Room, team, or user not found."
}
```
Status Code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while adding the player."
}
```

DELETE `api/v1/rooms/{roomId}/teams/{teamId}/players/{userId}`

Description: Method to remove a player (specified by userId) from a team in a particular room.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**

Empty

**Example Request**

Description: A DELETE request to remove a player (specified by userId) from a team in a specific room.

```
curl -X DELETE http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId}/players/{userId} \
-H "Authorization: Bearer access_token"
```

**Example Responses**

Status Code: **200 OK**

Description: The player was successfully removed from the specified team.

```
{
    "message": "Player removed from the team successfully."
}
```
Status Code: **400 Bad Request**

Description: The request was malformed, possibly due to incorrect or missing parameters.

```
{
    "message": "Invalid room, team, or user ID."
}
```
Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid.

```
{
    "message": "Unauthorized access."
}
```
Status Code: **403 Forbidden**

Description: The user does not have sufficient permissions to remove players from this team.

```
{
    "message": "Access denied. Insufficient permissions."
}
```
Status Code: **404 Not Found**

Description: The specified room, team, or user cannot be found, or the player is not part of the team.

```
{
    "message": "Player not found in the specified team."
}
```
Status Code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while removing the player."
}
```

PUT `/api/v1/rooms/{roomId}/teams/{teamId}/describer`

Description: This method sets a specific player (from the list of players in the team) as the describer of the team. The describer is responsible for explaining or describing selected words during the game.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**

userId (string): The ID of the player to be set as the describer. This player must be part of the players array in the team.

**Example Request**

Description: A PUT request to set a player (specified by userId) as the describer in a specific team within a room.

```
curl -X PUT http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId}/describer \
-H "Authorization: Bearer access_token" \
-H "Content-Type: application/json" \
-d '{"userId": "60d5f9a2b0f8b8e17a15f5f2"}'
```
**Example Responses**

Status Code: **200 OK**

Description: The describer was successfully updated.

```
{
    "message": "Player has been successfully set as the describer.",
    "team": {
        "teamId": "60d5f9a2b0f8b8e17a15f5f1",
        "roomId": "60d5f9a2b0f8b8e17a15f5f0",
        "name": "Alpha Team Updated",
        "score": 250,
        "players": [
            "60d5f9a2b0f8b8e17a15f5f2",
            "60d5f9a2b0f8b8e17a15f5f3"
        ],
        "describer": "60d5f9a2b0f8b8e17a15f5f2",
        "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
        "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
        "tryedWords": ["apple", "banana"]
    }
}
```

Status Code: **400 Bad Request**

Description: The request body is invalid, or the specified user is not part of the team.

```
{
    "message": "Invalid request body or the player is not part of the team."
}
```
Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have sufficient permissions to update the describer.

```
{
    "message": "Access denied. Insufficient permissions."
}
```
Status Code: **404 Not Found**

Description: The specified room or team cannot be found, or the player is not part of the team.

```
{
    "message": "Team, room, or player not found."
}
```
Status Code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while setting the describer."
}
```

PUT `/api/v1/rooms/{roomId}/teams/{teamId}/teamLeader`

Description: This method sets a specific player (from the list of players in the team) as the team leader. The team leader may have additional responsibilities, such as managing the team or making strategic decisions during the game.

Authentication: This endpoint requires the user to be authenticated with a valid access token.

**Request Body**

userId (string): The ID of the player to be set as the team leader. This player must be part of the players array in the team.

**Example Request**

Description: A PUT request to set a player (specified by userId) as the team leader in a specific team within a room.

```
curl -X PUT http://localhost:8080/api/v1/rooms/{roomId}/teams/{teamId}/teamLeader \
-H "Authorization: Bearer access_token" \
-H "Content-Type: application/json" \
-d '{"userId": "60d5f9a2b0f8b8e17a15f5f3"}'
```

**Example Responses**

Status Code: **200 OK**

Description: The team leader was successfully updated.

```
{
    "message": "Player has been successfully set as the team leader.",
    "team": {
        "teamId": "60d5f9a2b0f8b8e17a15f5f1",
        "roomId": "60d5f9a2b0f8b8e17a15f5f0",
        "name": "Alpha Team Updated",
        "score": 250,
        "players": [
            "60d5f9a2b0f8b8e17a15f5f2",
            "60d5f9a2b0f8b8e17a15f5f3"
        ],
        "describer": "60d5f9a2b0f8b8e17a15f5f2",
        "teamLeader": "60d5f9a2b0f8b8e17a15f5f3",
        "selectedWord": "60d5f9a2b0f8b8e17a15f5f4",
        "tryedWords": ["apple", "banana"]
    }
}
```

Status Code: **400 Bad Request**

Description: The request body is invalid, or the specified user is not part of the team.

```
{
    "message": "Invalid request body or the player is not part of the team."
}
```

Status Code: **401 Unauthorized**

Description: The request lacks proper authentication credentials or the provided token is invalid.

```
{
    "message": "Unauthorized access."
}
```

Status Code: **403 Forbidden**

Description: The user does not have sufficient permissions to update the team leader.

```
{
    "message": "Access denied. Insufficient permissions."
}
```

Status Code: **404 Not Found**

Description: The specified room or team cannot be found, or the player is not part of the team.

```
{
    "message": "Team, room, or player not found."
}
```

Status Code: **500 Internal Server Error**

Description: The server encountered an unexpected error while processing the request.

```
{
    "message": "An unexpected error occurred while setting the team leader."
}
```