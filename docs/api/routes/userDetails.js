/**
 * @openapi
 * /users/{id}/details:
 *   get:
 *     tags:
 *       - users details
 *     summary: Get users details by
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 *
 *   patch:
 *     tags:
 *       - users details
 *     summary: Update users details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userDetails'
 *     responses:
 *       200:
 *         description: OK
 *       404  :
 *         description: Not found
 */
