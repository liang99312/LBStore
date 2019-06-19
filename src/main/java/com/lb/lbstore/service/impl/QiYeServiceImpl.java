/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.QiYeDao;
import com.lb.lbstore.domain.QiYe;
import com.lb.lbstore.service.QiYeService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("qiYeServiceImpl")
public class QiYeServiceImpl implements QiYeService {

    @Autowired
    private QiYeDao qiYeDao;

    @Override
    public QiYe getQiYeById(Integer id) {
        return (QiYe) qiYeDao.findObjectById(QiYe.class, id);
    }

    @Override
    public List<QiYe> getAllQiYes() {
        return qiYeDao.getResult("from QiYe qiYe", null);
    }

    @Override
    public boolean updateQiYe(QiYe qiYe) {
        return qiYeDao.update(qiYe);
    }

    @Override
    public QiYe saveQiYe(QiYe qiYe) {
        int id = qiYeDao.saveQiYe(qiYe);
        return (QiYe) qiYeDao.findObjectById(QiYe.class, id);
    }

    @Override
    public boolean deleteQiYe(Integer id) {
        QiYe qiYe = (QiYe) qiYeDao.findObjectById(QiYe.class, id);
        if(qiYe.getState() == 0){
            qiYe.setState(-1);
            return qiYeDao.update(qiYe);
        }else if(qiYe.getState() == -1){
//            return qiYeDao.deleteObjById("qiYe", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        String sql = "select count(1) from QiYe where 1=1";
        if (map.containsKey("mc")) {
            sql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return qiYeDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<QiYe> queryQiYesByPage(HashMap map) {
        List parameters = new ArrayList();
        String hql = "from QiYe where 1=1";
        if (map.containsKey("mc")) {
            hql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return qiYeDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean recoverQiYe(Integer id) {
        QiYe qiYe = (QiYe) qiYeDao.findObjectById(QiYe.class, id);
        if(qiYe.getState() != 0){
            qiYe.setState(0);
            return qiYeDao.update(qiYe);
        }
        return false;
    }

    @Override
    public boolean existQiYe(Integer id, String mc) {
        return qiYeDao.existQiYe(id, mc);
    }

}
