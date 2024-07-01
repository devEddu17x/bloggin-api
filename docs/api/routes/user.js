/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Get users by name or lastname in param, both are not required, but one is required
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: User's name
 *       - name: lastname
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: User's lastname
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 *
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Get user by id
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete user by id
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 *   patch:
 *     tags:
 *       - users
 *     summary: Update a user by id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 */
