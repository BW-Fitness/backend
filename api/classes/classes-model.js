const db = require('../../data/db');

function getClasses() {
  return db
    .select(
      'class_id',
      'class_name',
      'class_type',
      'class_start_time',
      'class_duration',
      'class_intensity',
      'class_location',
      'class_registered_attendees',
      'class_max_size'
    )
    .from('classes')
}

function getClassById({ class_id }) {
  return db
    .select(
      'class_id',
      'class_name',
      'class_type',
      'class_start_time',
      'class_duration',
      'class_intensity',
      'class_location',
      'class_registered_attendees',
      'class_max_size'
    )
    .from('classes')
    .where('class_id', parseInt(class_id));
}

function findBy(filter) {
  return db
    .select(
      'class_name',
      'class_type',
      'class_start_time',
      'class_duration',
      'class_intensity',
      'class_location',
      'class_registered_attendees',
      'class_max_size'
    )
    .from('classes')
    .where(filter);
}

async function addClass(newClass) {
  const [newClassObject] = await db('classes')
    .insert(newClass, [
      'class_id',
      'class_name',
      'class_type',
      'class_start_time',
      'class_duration',
      'class_intensity',
      'class_location',
      'class_registered_attendees',
      'class_max_size'
  ])
  return newClassObject;
}

async function updateClass(eClass, id) {
  const [updatedClass] = await db('classes')
    .where('class_id', parseInt(id))
    .update(eClass, [
      'class_name',
      'class_type',
      'class_start_time',
      'class_duration',
      'class_intensity',
      'class_location',
      'class_registered_attendees',
      'class_max_size'
    ])
    return updatedClass;
}

async function deleteClass(class_id) {
  const [deletedClass] = await db('classes')
    .returning(['class_name', 'class_type', 'class_id'])
    .where('class_id', parseInt(class_id))
    .del()
  return deletedClass;
}

module.exports = {
    getClasses,
    getClassById,
    findBy,
    addClass,
    updateClass,
    deleteClass
};
