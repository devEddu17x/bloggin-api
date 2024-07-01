/**
 * @openapi
 * /posts:
 *   post:
 *     tags:
 *       - posts
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/post"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *   get:
 *     tags:
 *       - posts
 *     summary: Get posts without after param return nextAfter param in the response
 *     parameters:
 *       - name: after
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Get posts before 'after' param
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 * /posts/{id}:
 *   patch:
 *     tags:
 *       - posts
 *     summary: Update a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/post"
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *   get:
 *     tags:
 *       - posts
 *     summary: Get a post by id
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 *   delete:
 *     tags:
 *       - posts
 *     summary: Delete a post by id
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found

 */
